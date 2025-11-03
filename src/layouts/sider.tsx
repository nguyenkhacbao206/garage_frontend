import { Link, useLocation } from "react-router";
import { ColorStyle } from "../styles/colors"
import { AiOutlineAntDesign, AiOutlineCar, AiOutlineCodeSandbox, AiOutlineDollar, AiOutlineHome, AiOutlineLineChart, AiOutlinePlusCircle, AiOutlineTeam, AiOutlineTool } from "react-icons/ai";
import { useState } from "react";

const SiderManage = () => {
  const styleLink = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    borderRadius: "8px",
    color: ColorStyle.SidebarForeground,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "15px",
    transition: ColorStyle.TransitionSmooth,
  };

  const styleLinkHover = {
    backgroundColor: ColorStyle.PrimaryHoverUi,
  };

  const styleLinkActive = {
    backgroundColor: ColorStyle.SidebarRing,
    boxShadow: ColorStyle.ShadowPrimary,
    fontWeight: 600,
  };


  const location = useLocation();
  const [hovered, setHovered] = useState("");

  return (
    <div style={{
      width: 250,
      backgroundColor: ColorStyle.SidebarBackground,
      height: "100vh"
    }}>
      <div
        style={{
          height: "65px",
          borderBottom: `1px solid ${ColorStyle.SidebarBorder}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: ColorStyle.SidebarForeground,
        }}
      >
        <AiOutlineAntDesign size={40} />{" "}
        <span style={{ marginLeft: 15 }}>Bổn lào</span>
      </div>

      <div style={{ padding: "10px" }}>
        <div>
          <div style={{ margin: "10px 0", fontWeight: 600, color: ColorStyle.MutedForeground }}>Menu chính</div>
          {[
            { to: "/", icon: <AiOutlineHome />, label: "Tổng quan" },
            { to: "/vehiclereception", icon: <AiOutlinePlusCircle />, label: "Tiếp nhận xe" },
            { to: "/payment", icon: <AiOutlineDollar />, label: "Thanh toán" },
            { to: "/statistical", icon: <AiOutlineLineChart />, label: "Thống kê" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                ...styleLink,
                ...(hovered === item.to ? styleLinkHover : {}),
                ...(location.pathname === item.to ? styleLinkActive : {}),
              }}
              onMouseEnter={() => setHovered(item.to)}
              onMouseLeave={() => setHovered("")}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <div style={{ margin: "10px 0", fontWeight: 600, color: ColorStyle.MutedForeground }}>Quản lý</div>

          {[
            { to: "/customers", icon: <AiOutlineTeam />, label: "Khách hàng" },
            { to: "/services", icon: <AiOutlineTool />, label: "Dịch vụ" },
            { to: "/parts", icon: <AiOutlineCodeSandbox />, label: "Phụ tùng" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                ...styleLink,
                ...(hovered === item.to ? styleLinkHover : {}),
                ...(location.pathname === item.to ? styleLinkActive : {}),
              }}
              onMouseEnter={() => setHovered(item.to)}
              onMouseLeave={() => setHovered("")}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiderManage