import { Link, useLocation } from "react-router";
import { ColorStyle } from "../styles/colors"
import { AiOutlineAntDesign, AiOutlineCar, AiOutlineCodeSandbox, AiOutlineDollar, AiOutlineHome, AiOutlineLineChart, AiOutlinePlusCircle, AiOutlineTeam, AiOutlineTool } from "react-icons/ai";
import { useState } from "react";

const SiderManage = ({ isSider }: { isSider: boolean }) => {
  const styleLink = {
    display: "flex",
    alignItems: "center",
    justifyContent: isSider ? "" : "center",
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
      width: isSider ? 250 : 80,
      backgroundColor: ColorStyle.SidebarBackground,
      height: "100vh",
      transition: "width 0.3s ease"
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
        {isSider ? <span style={{ marginLeft: 15 }}>Bổn lào</span> : <></>}
      </div>

      <div style={{ padding: "10px" }}>
        <div>
          <div style={{ margin: "10px 0", fontWeight: 600, color: ColorStyle.MutedForeground, }}>{isSider ? "Menu chính" : ""}</div>
          {[
            { to: "/", icon: <AiOutlineHome size={18} />, label: "Tổng quan" },
            { to: "/vehiclereception", icon: <AiOutlinePlusCircle size={18} />, label: "Tiếp nhận xe" },
            { to: "/payment", icon: <AiOutlineDollar size={18} />, label: "Thanh toán" },
            { to: "/statistical", icon: <AiOutlineLineChart size={18} />, label: "Thống kê" },
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
              {isSider ? item.label : ""}
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          <div style={{ margin: "10px 0", fontWeight: 600, color: ColorStyle.MutedForeground, }}>{isSider ? "Quản lý" : ""}</div>
          {[
            { to: "/customers", icon: <AiOutlineTeam size={18} />, label: "Khách hàng" },
            { to: "/services", icon: <AiOutlineTool size={18} />, label: "Dịch vụ" },
            { to: "/parts", icon: <AiOutlineCodeSandbox size={18} />, label: "Phụ tùng" },
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
              {isSider ? item.label : ""}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SiderManage