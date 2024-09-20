import React from "react";
import YellowBox from "../../components/YellowBox";
import { useConnectAccountStore } from "./ConnectAccountStore";

const AccountNumber: React.FC = () => {
  const { accountNum, setAccountNum } = useConnectAccountStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountNum(e.target.value);
  };

  return (
    <div>
      <header>
        <h1 className="text-[40px] text-center">통장 등록</h1>
      </header>

      <div className="w-full flex justify-center mt-[100px]">
        <YellowBox>
          <div>
            <p className="font-bold text-[30px] mb-[20px]">계좌번호</p>
          </div>
          <div>
            <input
              type="number"
              value={accountNum}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded-lg text-[35px]"
            />
          </div>
        </YellowBox>
      </div>
    </div>
  );
};

export default AccountNumber;
