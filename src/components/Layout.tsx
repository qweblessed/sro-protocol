import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: any) => {

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen">
      <Header />
      {children}
 
    </div>
  );
};

export default Layout;
