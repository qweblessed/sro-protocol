import Header from "./header";

const Layout = ({ children }: any) => {

  return (
    <div className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 h-screen  ">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
