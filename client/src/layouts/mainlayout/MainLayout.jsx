import { Outlet } from "react-router-dom";
import Header from "../../components/shared/header/Header";
import Topbar from "../../components/shared/topbar/Topbar";
import Footer from "../../components/shared/footer/Footer";
import Navbar from "../../components/shared/navbar/Navbar";
import ContainerFull from "../../components/container/ContainerFull";
import CustomerInfoNavbar from "../../components/shared/navbar/CustomerInfoNavbar";
import useAuthProvider from "../../hooks/useAuthProvider";
import { useState } from "react";

const MainLayout = () => {
  const { user } = useAuthProvider();
  const customer = JSON.parse(sessionStorage.getItem("Customer"));
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const showCustomerInfo = user?.role === "reseller" && customer ? true : false;
  return (
    <>
      <ContainerFull>
        <Topbar></Topbar>
        <Header setOpenMobileMenu={setOpenMobileMenu}></Header>
        <Navbar openMobileMenu={openMobileMenu}></Navbar>
        {showCustomerInfo && <CustomerInfoNavbar />}
      </ContainerFull>
      <div className="w-full" style={{ minHeight: "calc(100vh - 623px)" }}>
        <Outlet></Outlet>
      </div>
      <ContainerFull>
        <Footer></Footer>
      </ContainerFull>
    </>
  );
};

export default MainLayout;
