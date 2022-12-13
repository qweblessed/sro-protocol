import Header from "./header";

const Layout = ({ children }: any) => {

  return (
    <div className="bg-gradient-to-b from-gray-500 to-gray-600 bg-gradient-to-r h-screen  ">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
