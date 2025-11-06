import { BrowserRouter, Outlet } from "react-router";
import FooterManage from "./layouts/footer";
import HeaderManage from "./layouts/header";
import SiderManage from "./layouts/sider";
import { ColorStyle } from "./styles/colors";
import AllRoutes from "./Router";
import { useState } from "react";

function App() {
  const [isSider, setIsSider] = useState<boolean>(true)
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        backgroundColor: ColorStyle.BgBase
      }}
    >
      <div><SiderManage isSider={isSider} /></div>
      <div style={{ width: "100%" }}>
        <HeaderManage setIsSider={setIsSider} isSider={isSider} />
        <div style={{
          minHeight: "470px",
          padding: "10px"
        }}>
          <Outlet />
        </div>
        <FooterManage />
      </div>
    </div>
  );
}

export default App;
