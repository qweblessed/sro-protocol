import Header from "./header";
import bg from '../assets/background/background.png'
import Image from "next/image";
const Layout = ({ children }: any) => {

  return (
    <div className="bg-[url('../assets/background/background.png')] bg-cover h-screen">
      
      <Header />
      {children}
    </div>
  );
};

export default Layout;
