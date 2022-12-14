import Image from "next/image";
import { CustomConnectButton } from "./connect-button";
import zroLogo from "../../assets/header/logo.png";
import Link from "next/link";

export default function Header() {
  return (
    <div>
      <div className="flex justify-between max-sm:justify-around ">
        <div className="flex items-center">
          <Image
            src={zroLogo}
            alt=""
            width={150}
            height={150}
            className="animate-pulse max-sm:h-[130px] max-sm:w-[130px] "
          />
        </div>
        

        <div className="flex flex-row w-[10%] h-[120px] justify-center items-center shadow-customLightBlue mt-2 ml-[1%] max-sm:h-[150px] max-sm:w-[40%]">
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
}
