// src/components/signup/WelcomeStep.tsx
import React, { useEffect } from 'react';
import GreenText from "../../../components/GreenText" 
import YellowButton from "../../../components/YellowButton";
import StartSignUpWithSinbi from "../../../assets/audio/55_안녕하세요_저는_신비예요_같이_회원가입을_해_볼까요.mp3"
interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  // 오디오말하기
  const audio = new Audio(StartSignUpWithSinbi);

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
      <GreenText text="안녕하세요!" boldChars={["안녕하세요"]} />
      <GreenText text="저는 신비예요." boldChars={["신비"]} />
      <GreenText text="같이 회원가입을" boldChars={["회원가입"]} />
      <GreenText text="해볼까요?" boldChars={[]} />
      <YellowButton height={50} width={200} onClick={onNext}>
        시작하기
      </YellowButton>
    </>
  );
};

export default WelcomeStep;