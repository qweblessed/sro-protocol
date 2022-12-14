import Header from "./header";
import bg from '../assets/background/background.png'
import Image from "next/image";
const Layout = ({ children }: any) => {

  return (
    <div >
      <Image src={bg} className="backgroundImg" width={2880} height={1614} alt="bg-image"/>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
