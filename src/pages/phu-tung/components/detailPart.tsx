interface IDetailPart {
  data: any;
}

const DetailPart = ({ data }: IDetailPart) => {
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
      <h3 style={{ marginBottom: "20px", color: "#333" }}>
        Thông tin phụ tùng
      </h3>

      <div style={rowStyle}>
        <span style={labelStyle}>Tên phụ tùng:</span>
        <span style={valueStyle}>{data?.name || "-"}</span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Đơn vị:</span>
        <span style={valueStyle}>{data?.unit || "-"}</span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Giá:</span>
        <span style={valueStyle}>
          {data?.price?.toLocaleString("vi-VN")} ₫
        </span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Tồn kho:</span>
        <span style={valueStyle}>{data?.stock || 0}</span>
      </div>

      <div style={rowStyle}>
        <span style={labelStyle}>Nhà cung cấp:</span>
        <span style={valueStyle}>
          <div>- {data?.supplier?.name}</div>
          <div>- {data?.supplier?.address}</div>
          <div>- {data?.supplier?.email}</div>
          <div>- {data?.supplier?.phone}</div>
          <div>- {data?.supplier?.description}</div>
        </span>
      </div>

      <div style={{ ...rowStyle, alignItems: "flex-start" }}>
        <span style={labelStyle}>Mô tả:</span>
        <span style={{ ...valueStyle, whiteSpace: "pre-line" }}>
          {data?.description || "— Không có mô tả —"}
        </span>
      </div>
    </div>
  );
};

export default DetailPart;
