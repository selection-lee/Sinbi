import React from "react";
import avatar from "./assets/avatar.png";

const TitlePage: React.FC = () => {


  return (
    <div className="relative flex h-screen flex-col items-center">
      <div className="mt-[40px]">
        {/* 제일 윗부분 */}
        <div className="mt-4 text-center">
          <h1 className="mb-5 mt-5 text-3xl leading-loose">
            은행을 안가도 <br /> 말로 편하게
          </h1>

          <div className="mb-[60px] mt-10">
            {/* 신 뒤에 작은 노란원 */}
            <div className="relative inline-block">
              <div className="absolute left-[5px] top-[10px] z-0 h-[20px] w-[20px] -translate-y-1/2 transform rounded-full bg-[#FFC700]"></div>
              <span className="relative z-10 -mt-3 block text-[50px] font-bold text-[#0D690D]">
                신
              </span>
            </div>

            {/* 비 뒤에 큰 노란원 */}
            <div className="relative top-5 inline-block">
              <div className="absolute inset-0 left-[-20px] top-[-20px] z-0 mr-5 flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#FFC700]"></div>
              <span className="relative z-10 mt-5 text-[50px] font-bold text-[#0D690D]">
                비
              </span>
            </div>
          </div>

          <h2 className="relative mb-5 mt-4 text-2xl font-bold text-[#0B4B24]">
            <p className="mb-5 mr-10 mt-5">어르신을 위한</p>
            <span className="relative mb-5 ml-10 mt-5">
              맞춤 은행 비서
              {/* "신" 위 노란 강조점 */}
              <div className="absolute -top-[65px] left-[20px] h-[10px] w-[10px] rounded-full bg-[#FFC700]"></div>
              {/* "비" 위 노란 강조점 */}
              <div className="absolute -top-3 left-[120px] h-[10px] w-[10px] rounded-full bg-[#FFC700]"></div>
            </span>
          </h2>
        </div>
      </div>

      {/* 아바타 들어갈 부분 */}
      <div className="absolute bottom-1 mt-6 flex flex-col items-center">
        <div className="h-[180px] w-[180px] overflow-hidden">
          <img
            src={avatar}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TitlePage;
