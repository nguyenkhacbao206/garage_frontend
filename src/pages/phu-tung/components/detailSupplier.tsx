import { ColorStyle } from "../../../styles/colors";

interface IDetailSupplier {
  data: any;
}

const DetailSupplier = ({ data }: IDetailSupplier) => {
  const rowStyle = {
    display: "flex",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  };

  const labelStyle = {
    width: "160px",
    fontWeight: 600,
    color: "#555",
  };

  const valueStyle = {
    flex: 1,
    color: "#222",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        maxWidth: "650px",
      }}
    >
      <h3 style={{ marginBottom: "0", color: "#333" }}>
        Thông tin nhà cung cấp
      </h3>
      <div style={{
        marginBottom: "20px",
        marginTop: 6,
        fontSize: 13,
        color: ColorStyle.TextTertiary
      }}>
        <span style={{}}>Lần cập nhật gần nhất:</span>
        <span style={{}}>{data?.updatedAt || "-"}</span>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Mã NCC:</div>
        <div style={valueStyle}>{data?.supplierCode || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Tên nhà cung cấp:</div>
        <div style={valueStyle}>{data?.name || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Ngày tạo:</div>
        <div style={valueStyle}>{data?.createdAt || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Địa chỉ:</div>
        <div style={valueStyle}>{data?.address || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Email:</div>
        <div style={valueStyle}>{data?.email || "-"}</div>
      </div>

      <div style={rowStyle}>
        <div style={labelStyle}>Số điện thoại:</div>
        <div style={valueStyle}>{data?.phone || "-"}</div>
      </div>

      <div style={{ ...rowStyle, borderBottom: "none" }}>
        <div style={labelStyle}>Mô tả:</div>
        <div style={{ ...valueStyle, whiteSpace: "pre-line" }}>
          {data?.description || "— Không có mô tả —"}
        </div>
      </div>
    </div>
  );
};

export default DetailSupplier;
