// src/components/signup/UserNameStep.tsx
import React, { useEffect } from 'react';
import GreenText from "../../../components/GreenText";
import SayName from "../../../assets/audio/56_이름을_말하거나_입력해주세요.mp3"
import useUserStore from '../useUserStore';

// interface UserNameStepProps {
//   name: string;
//   setName: (name: string) => void;
//   onNext: () => void;
// }

const UserNameStep: React.FC = () => {
  const { name } = useUserStore();

  // 오디오말하기
  const audio = new Audio(SayName);

  // 오디오 플레이 (component가 mount될때만)
  useEffect(() => {
    // 플레이시켜
    audio.play();

    // 근데 component가 unmount 되면 플레이 중지! 시간 0초로 다시 되돌려
    return () => {
        audio.pause();
        audio.currentTime = 0;
    };
  }, []);

  return (
    <>
      <GreenText text="이름을 알려주세요." boldChars={["이름"]} />
      <input
        type="text"
        value={name}
        readOnly 
        // onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
    </>
  );
};

export default UserNameStep;