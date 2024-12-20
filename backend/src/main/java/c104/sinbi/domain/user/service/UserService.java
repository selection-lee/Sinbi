package c104.sinbi.domain.user.service;

import c104.sinbi.common.exception.RefreshTokenNotFoundException;
import c104.sinbi.common.jwt.FaceIdAuthenticationProvider;
import c104.sinbi.common.util.CookieUtil;
import c104.sinbi.common.util.KakaoFaceAuthenticationUtil;
import c104.sinbi.common.config.s3.S3Uploader;
import c104.sinbi.common.constant.ErrorCode;
import c104.sinbi.common.exception.UserAlreadyExistsException;
import c104.sinbi.common.jwt.TokenProvider;
import c104.sinbi.common.util.RedisUtil;
import c104.sinbi.domain.user.User;
import c104.sinbi.domain.user.dto.LoginDto;
import c104.sinbi.domain.user.dto.SignUpDto;
import c104.sinbi.domain.user.dto.TokenDto;
import c104.sinbi.domain.user.dto.UserResponse;
import c104.sinbi.domain.user.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class UserService {
    private final String AUTHORIZATION = "Authorization";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final S3Uploader s3Uploader;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;
    private final FaceIdAuthenticationProvider faceIdAuthenticationProvider;
    private final CookieUtil cookieUtil;

    @Transactional
    public UserResponse signup(@Valid final SignUpDto signUpDto, final MultipartFile multiPartFile) {
        if (duplicatePhoneNumber(signUpDto.getUserPhone()))
            throw new UserAlreadyExistsException();
        String encodedPassword = passwordEncoder.encode(signUpDto.getUserPassword()); // 패스워드 인코딩
        String convertImageUrl = null;
        if (multiPartFile != null && !multiPartFile.isEmpty())
            convertImageUrl = s3Uploader.putS3(multiPartFile); // 얼굴인증 이미지 S3 저장
        User user = User.builder().signUpDto(signUpDto).encodedPassword(encodedPassword).convertImageUrl(convertImageUrl).build();

        userRepository.save(user);
        log.info(user.getUserPhone());
        return UserResponse.builder()
                .id(user.getId())
                .userName(user.getName())
                .userPhone(user.getUserPhone())
                .userFaceId(user.getUserFaceId())
                .build();

    }

    /**
     * @param requestDto 로그인할 이메일과 비밀번호
     * @param response   토큰을 헤더에 추가하기 위한 servlet 데이터
     * @return 데이터베이스에 저장된 유저 데이터
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-09-08
     * @ 설명     : 로그인 시 토큰 발급 및 헤더에 Access, Refresh 토큰 추가
     * @status 성공 : 200, 실패 : 401, 404
     */
    @Transactional
    public UserResponse login(@Valid final LoginDto requestDto, final MultipartFile multipartFile, HttpServletResponse response) throws IOException {
        User user = userRepository.findByUserPhone(requestDto.getPhone()).orElseThrow(
                () -> new UserAlreadyExistsException(ErrorCode.NOT_FOUND_PHONE_NUMBER)
        );
        Authentication authenticationToken;
        Authentication authentication;
        if (multipartFile != null && !multipartFile.isEmpty()) {
            authenticationToken = new UsernamePasswordAuthenticationToken(requestDto.getPhone(), multipartFile);
            authentication = faceIdAuthenticationProvider.authenticate(authenticationToken);
        } else {
            // 비밀번호로 인증 시도
            authenticationToken = new UsernamePasswordAuthenticationToken(requestDto.getPhone(), requestDto.getPassword());
            authentication = managerBuilder.getObject().authenticate(authenticationToken);
        }
        TokenDto tokenDto = tokenProvider.generateToken(authentication);
        response.addHeader(AUTHORIZATION, tokenDto.accessToken());
        cookieUtil.addRefreshTokenCookie(response, tokenDto);
        redisUtil.setData(requestDto.getPhone(), tokenDto.refreshToken(), tokenDto.refreshTokenExpiresIn());

        return UserResponse.builder()
                .id(user.getId())
                .userName(user.getName())
                .userPhone(user.getUserPhone())
                .userFaceId(user.getUserFaceId())
                .build();
    }

    @Transactional
    public TokenDto reissue(TokenDto tokenDto) {
        // 받아온 토큰을 가지고 토큰 유효성 검증 및 Authentication 생성
        Authentication authentication = tokenProvider.getAuthentication(tokenDto.refreshToken());
        // redis에 저장된 refreshToken 가져오기
        String refreshToken = redisUtil.getData(authentication.getName());

        // refreshToken의 유효기간이 끝났으면 예외
        if (refreshToken == null) {
            throw new RefreshTokenNotFoundException(ErrorCode.EXPIRED_REFRESH_TOKEN);
        }
        // 받아온 refreshToken이 redis의 refreshToken이랑 일치하지 않으면 예외
        if (!Objects.equals(refreshToken, tokenDto.refreshToken())) {
            throw new RefreshTokenNotFoundException(ErrorCode.WRONG_TYPE_TOKEN);
        }
        // 토큰 재발급
        TokenDto reissueToken = tokenProvider.generateToken(authentication);

        // redis에 토큰 넣기
        redisUtil.setData(authentication.getName(), reissueToken.refreshToken(), reissueToken.refreshTokenExpiresIn());

        return reissueToken;
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-09-08
     * @ 설명     : 헤더에  Access,Refresh토큰 추가
     * @param tokenDto 로그인 시 발급한 토큰 데이터
     * @param response 토큰을 헤더에 추가하기 위한 servlet
     * @return
     */
    private void tokenToHeader(TokenDto tokenDto, HttpServletResponse response){
        response.addHeader("Authorization",tokenDto.accessToken());
        response.addHeader("refreshToken",tokenDto.refreshToken());
    }
    private boolean duplicatePhoneNumber(String phone) {
        return userRepository.findByUserPhone(phone).isPresent();
    }
}
