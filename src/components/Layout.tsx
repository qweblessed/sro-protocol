import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: any) => {

  return (
    <div className="bg-gradient-to-t  from-customDeepBlue via-customSkyBlue to-customDeepBlue h-screen">
      <Header />
      {children}
 
    </div>
  );
};

export default Layout;
