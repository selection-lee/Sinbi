// src/components/User/SignUpStep/UserPasswordStep.tsx
import React, { useEffect } from 'react';
import GreenText from "../../../components/GreenText";
import YellowButton from "../../../components/YellowButton";
import NumberPad from "../NumberPad";
import SpeechBubble from "../../../components/SpeechBubble";
import SimpPW from "../../../assets/audio/51_비밀번호_네_자리를_입력해주세요.mp3"
interface UserPasswordStepProps {
  password: string;
  setPassword: (password: string) => void;
  onNext: () => void;
  error: string | null;
}

const UserPasswordStep: React.FC<UserPasswordStepProps> = ({ password, setPassword, onNext, error }) => {
  // 오디오말하기
  const audio = new Audio(SimpPW);

  // 오디오 플레이 (component가 mount될때만)
  useEffect(() => {
    // 플레이시켜
    audio.play();

    // 근데 component가 unmount 되면 플레이 중지! 시간 0초로 다시 되돌려
    return () => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <>
      {error && (
        <SpeechBubble
          text={error}
          boldChars={[]}
          textSize="text-[24px]"
        />
      )}
      <GreenText text="간편비밀번호" boldChars={[""]} />
      <GreenText text="숫자 네 자리를" boldChars={["숫자 네 자리"]} />
      <GreenText text="눌러주세요" boldChars={[]} />
      <NumberPad value={password} onChange={setPassword} maxLength={4} />
      <YellowButton height={50} width={200} onClick={onNext}>
        다음
      </YellowButton>
    </>
  );
};

export default UserPasswordStep;