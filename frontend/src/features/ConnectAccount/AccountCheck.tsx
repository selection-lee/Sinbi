import React from "react";
import YellowBox from "../../components/YellowBox";
import { useConnectAccountStore } from "./ConnectAccountStore";
import bankLogos from "../../assets/bankLogos";

const AccountCheck: React.FC = () => {
  const { bankType, accountNum } = useConnectAccountStore();
  const banks = [
    { id: "IBK", name: "IBK기업은행", logo: bankLogos["IBK기업은행"] },
    { id: "KOOKMIN", name: "국민은행", logo: bankLogos["KB국민은행"] },
    { id: "KDB", name: "KDB산업은행", logo: bankLogos["KDB산업은행"] },
    { id: "KEB", name: "KEB외환은행", logo: bankLogos["KEB외환은행"] },
    { id: "NH", name: "NH농협은행", logo: bankLogos["NH농협은행"] },
    { id: "SBI", name: "SBI저축은행", logo: bankLogos["SBI저축은행"] },
    { id: "SC", name: "SC제일은행", logo: bankLogos["SC제일은행"] },
    { id: "KYUNGNAM", name: "경남은행", logo: bankLogos["경남은행"] },
    { id: "GWANJU", name: "광주은행", logo: bankLogos["광주은행"] },
    { id: "DAEGU", name: "대구은행", logo: bankLogos["대구은행"] },
    { id: "BUSAN", name: "부산은행", logo: bankLogos["부산은행"] },
    { id: "SANLIM", name: "산림조합", logo: bankLogos["산림조합"] },
    { id: "SAEMAEUL", name: "새마을은행", logo: bankLogos["새마을은행"] },
    { id: "SUHYUB", name: "수협은행", logo: bankLogos["수협은행"] },
    { id: "SHINHAN", name: "신한은행", logo: bankLogos["신한은행"] },
    { id: "SHINHYUB", name: "신협은행", logo: bankLogos["신협은행"] },
    { id: "CITY", name: "씨티은행", logo: bankLogos["씨티은행"] },
    { id: "WOORI", name: "우리은행", logo: bankLogos["우리은행"] },
    { id: "POSTBANK", name: "우체국은행", logo: bankLogos["우체국은행"] },
    { id: "JYOCHUK", name: "저축은행", logo: bankLogos["저축은행"] },
    { id: "JYUNBUK", name: "전북은행", logo: bankLogos["전북은행"] },
    { id: "JEJU", name: "제주은행", logo: bankLogos["제주은행"] },
    { id: "KAKAO", name: "카카오뱅크", logo: bankLogos["카카오뱅크"] },
    { id: "TOSS", name: "토스뱅크", logo: bankLogos["토스뱅크"] },
    { id: "HANA", name: "하나은행", logo: bankLogos["하나은행"] },
    { id: "HANKUKTUZA", name: "한국투자증권", logo: bankLogos["한국투자증권"] },
  ];

  const selectedBank = banks.find((bank) => bank.id === bankType);

  return (
    <div>
      <header>
        <h1 className="text-[40px] text-center">통장 확인</h1>
      </header>

      <div className="flex justify-center mt-4 w-[350px]">
        <YellowBox>
          {/* 은행 로고와 이름 */}
          <div className="flex items-center space-x-4">
            {selectedBank && (
              <>
                <img
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  className="w-10 h-10"
                />
                <p className="font-bold text-[30px]">{selectedBank.name}</p>
              </>
            )}
          </div>

          {/* 계좌번호 */}
          <div>
            <p className="font-bold text-[30px]">{accountNum}</p>
          </div>
        </YellowBox>
      </div>
    </div>
  );
};

export default AccountCheck;
