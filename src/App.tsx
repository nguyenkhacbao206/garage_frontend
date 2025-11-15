import { BrowserRouter, Outlet, useNavigate } from "react-router";
import FooterManage from "./layouts/footer";
import HeaderManage from "./layouts/header";
import SiderManage from "./layouts/sider";
import { ColorStyle } from "./styles/colors";
import AllRoutes from "./Router";
import { useEffect, useState } from "react";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { getCookie } from "./utils/cookie";

function App() {
  const widthWindow = window.innerWidth;
  const [isSider, setIsSider] = useState<boolean>(widthWindow <= 576 ? false : true)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const screen = useBreakpoint()
  const isMobile = screen.sm
  const navigate = useNavigate()

  useEffect(() => {
    const token = getCookie('refreshToken');
    if (!token) {
      navigate("/login")
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  if (isAuthenticated === null || !isAuthenticated) {
    return null
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        backgroundColor: ColorStyle.BgBase
      }}
    >
      <div><SiderManage setIsSider={setIsSider} isSider={isSider} /></div>
      <div style={{ width: "100%" }}>
        <HeaderManage setIsSider={setIsSider} isSider={isSider} />
        <div style={{
          minHeight: "470px",
          padding: "10px 20px",
          marginTop: "65px",
          marginLeft: !isMobile ? "0px" : isSider ? "250px" : "80px",
          transition: "margin-left 0.3s ease",
        }}>
          <Outlet />
        </div>
        <FooterManage />
      </div>
    </div>
  );
}

export default App;
