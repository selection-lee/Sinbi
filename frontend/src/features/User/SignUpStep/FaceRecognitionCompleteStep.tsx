// src/components/User/SignUpStep/FaceRecognitionCompleteStep.tsx
import React from 'react';
import GreenText from "../../../components/GreenText";
import YellowButton from "../../../components/YellowButton";

interface FaceRecognitionCompleteStepProps {
  onComplete: () => void;
}

const FaceRecognitionCompleteStep: React.FC<FaceRecognitionCompleteStepProps> = ({ onComplete }) => {
  return (
    <>
      <GreenText text="얼굴 인식이 완료되었습니다." boldChars={["완료"]} />
      <YellowButton height={50} width={200} onClick={onComplete}>
        회원가입 완료
      </YellowButton>
    </>
  );
};

export default FaceRecognitionCompleteStep;