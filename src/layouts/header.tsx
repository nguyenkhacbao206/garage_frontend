import { useState } from "react";
import { ColorStyle } from "../styles/colors"
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from "react-icons/ai";

const HeaderManage = (
  {
    setIsSider,
    isSider
  }:
    {
      setIsSider?: (a: boolean) => void
      isSider?: boolean
    }) => {

  return (
    <div
      style={{
        display: "block",
        backgroundColor: ColorStyle.BgLayout,
        position: "sticky",
        top: "0",
        right: "0",
        width: "100%",
        borderBottom: `1px solid ${ColorStyle.Border}`
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "65px",
          padding: "0 30px"
        }}
      >
        <div
          onClick={() => setIsSider?.(!isSider)}
        >
          {isSider ? <AiOutlineMenuFold size={23} /> : <AiOutlineMenuUnfold size={23} />}
        </div>
        <div>
          <button>Đăng nhập</button>
        </div>
      </div>
    </div>
  )
}

export default HeaderManage