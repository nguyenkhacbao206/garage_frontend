import { useState } from "react"
import { ColorStyle } from "../../styles/colors"
import Parts from "./components/part"
import Suppliers from "./components/supplier"
import Imported from "./components/imported "

const PartCars = () => {
  const [segmented, setSegmented] = useState<1 | 2 | 3>(1)

  const styleOp = {
    padding: "3px 14px",
    fontSize: 15,
    fontWeight: 500,
    borderRadius: 6,
    cursor: "pointer"
  }
  return (
    <>
      <h1 style={{
        fontSize: 35,
        marginTop: 10
      }}>Quản lý phụ tùng</h1>
      <p>Danh sách quản lý phụ tùng</p>
      <div>
        <div style={{
          display: "inline-flex",
          padding: 4,
          borderRadius: 8,
          backgroundColor: ColorStyle.BgSpotlight,
          marginLeft: 10
        }}>
          <div onClick={() => setSegmented(1)} style={{
            ...styleOp,
            backgroundColor: segmented === 1 ? "#fff" : "transparent",
          }}>Phụ tùng</div>
          <div onClick={() => setSegmented(2)} style={{
            ...styleOp,
            backgroundColor: segmented === 2 ? "#fff" : "transparent",
          }}>Nhà cung cấp</div>
          <div onClick={() => setSegmented(3)} style={{
            ...styleOp,
            backgroundColor: segmented === 3 ? "#fff" : "transparent",
          }}>Nhập hàng</div>
        </div>
      </div>
      <div>
        {segmented === 1 ?
          <Parts />
          : segmented === 2 ?
            <Suppliers /> :
            <Imported />
        }
      </div>
    </>
  )
}

export default PartCars