package c104.sinbiaccount.filter;

import c104.sinbiaccount.constant.ErrorCode;
import c104.sinbiaccount.exception.global.ApiResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    /**
     * @param request               헤더에서 토큰을 가져오기위한 servlet
     * @param response              토큰을 헤더에 추가하기 위한 servlet
     * @param accessDeniedException exception
     * @return
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-09-08
     * @ 설명     : 접근할 수 있는 권한을 가지고 있는지 검증
     * @status 실패 : 403
     */
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ObjectMapper objectMapper = new ObjectMapper();

        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().write(objectMapper.writeValueAsString(ApiResponse.error(ErrorCode.PERMISSION_DENIED.getMessage())));
    }
}
