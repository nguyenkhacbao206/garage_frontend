import { BrowserRouter, Outlet } from "react-router";
import FooterManage from "./layouts/footer";
import HeaderManage from "./layouts/header";
import SiderManage from "./layouts/sider";
import { ColorStyle } from "./styles/colors";
import AllRoutes from "./Router";

function App() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        backgroundColor: ColorStyle.BgBase
      }}
    >
      <div><SiderManage /></div>
      <div style={{ width: "100%" }}>
        <HeaderManage />
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
