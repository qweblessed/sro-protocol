import Footer from "./footer";
import Header from "./header";

const Layout = ({ children }: any) => {

  return (
    <div className="bg-gradient-to-t  from-customDeepBlue via-customSkyBlue to-customDeepBlue">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
