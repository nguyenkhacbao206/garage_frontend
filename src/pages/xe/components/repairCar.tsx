import { useEffect, useState } from "react"
import TableBase, { Column } from "../../../components/BaseTable"
import Button from "../../../components/Button"
import { notify } from "../../../components/Notification"
import { AiOutlineCheckCircle, AiOutlineSearch } from "react-icons/ai"
import { Input } from "../../../components/FormBase"
import { getCar, putCar } from "../../../services/api/carApi"
import BaseModal from "../../../components/baseModal"
import { ColorStyle } from "../../../styles/colors"
import { IoIosCheckmarkCircleOutline } from "react-icons/io"

const RepairCar = () => {
  const [dataRepair, setDataRepair] = useState<MCar.IResponse[]>([])
  const [isReload, setIsReload] = useState<boolean>(false)
  const [search, setSearch] = useState<string>("")
  
  // State cho modal xác nhận
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false)
  const [selectedCar, setSelectedCar] = useState<MCar.IResponse | null>(null)

  // Cấu hình cột cho bảng
  const columns: Column<MCar.IResponse>[] = [
    {
      title: "Biển số xe",
      dataIndex: "plate",
      width: 120
    },
    {
      title: "Hãng xe",
      dataIndex: "manufacturer",
      width: 150
    },
    {
      title: "Mẫu xe",
      dataIndex: "model",
      width: 150
    },
    {
      title: "Mô tả lỗi/tình trạng",
      dataIndex: "description",
      width: 300
    },
    {
      title: "Thao tác",
      width: 120,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => openConfirmModal(record)}
            type="success"
            style={{ 
                padding: "5px 10px", 
                fontSize: 13, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 5 
            }}
          >
            <AiOutlineCheckCircle /> Hoàn thành
          </Button>
        </div>
      )
    },
  ]

  // Gọi API lấy danh sách
  useEffect(() => {
    getCar().then(res => {
      if (res.data) {
        // LỌC DỮ LIỆU: Chỉ lấy xe có active === false (Đang sửa)
        const listRepair = res.data.filter(car => car.active === false)
        setDataRepair(listRepair)
      }
    })
  }, [isReload])

  // Mở modal xác nhận
  const openConfirmModal = (car: MCar.IResponse) => {
      setSelectedCar(car)
      setIsModalConfirm(true)
  }

  // Xử lý logic "Sửa xong"
  const handleFinishRepair = async () => {
    if (!selectedCar) return;

    try {
      // Chuẩn bị dữ liệu payload. 
      // QUAN TRỌNG: Phải map lại đầy đủ thông tin cũ, chỉ đổi active thành true
      const payload: MCar.IRequest = {
        plate: selectedCar.plate,
        model: selectedCar.model,
        manufacturer: selectedCar.manufacturer,
        description: selectedCar.description,
        customerId: selectedCar.customerId, // Backend cần ID này để validate
        active: true // Đánh dấu là đã sửa xong (active lên true)
      }

      const res = await putCar(selectedCar.id, payload)

      if (res.success) {
        notify({ 
            title: "Thành công", 
            type: "success", 
            description: `Xe ${selectedCar.plate} đã sửa xong và được đưa về danh sách hoạt động.` 
        })
        setIsReload(!isReload) // Reload lại bảng để loại bỏ xe vừa xong
        setIsModalConfirm(false)
      } else {
        notify({ 
            title: "Thất bại", 
            type: "error", 
            description: res.message || "Có lỗi xảy ra" 
        })
      }
    } catch (error) {
        notify({ title: "Error", type: "error", description: "Lỗi kết nối server" })
    }
  }

  // Lọc theo ô tìm kiếm
  const filteredData = dataRepair.filter(car => {
    const s = search.toLowerCase()
    return (
      car.plate.toLowerCase().includes(s) ||
      car.model.toLowerCase().includes(s)
    )
  })

  return (
    <div style={{ margin: "50px 0" }}>
      {/* Modal xác nhận */}
      <BaseModal isOpen={isModalConfirm} closeModal={() => setIsModalConfirm(false)}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column',
          padding: 20
        }}>
          <IoIosCheckmarkCircleOutline style={{ fontSize: 70, color: ColorStyle.Success || 'green' }} />
          <h3 style={{marginTop: 10}}>Xác nhận sửa xong?</h3>
          <p style={{textAlign: 'center', marginBottom: 20}}>
            Bạn xác nhận xe <b>{selectedCar?.plate}</b> đã hoàn tất quá trình sửa chữa? <br/>
            Xe sẽ được chuyển sang danh sách xe hoạt động.
          </p>
          <div>
            <Button style={{ marginRight: 10 }} onClick={() => setIsModalConfirm(false)}>Hủy bỏ</Button>
            <Button type="primary" onClick={handleFinishRepair}>Xác nhận</Button>
          </div>
        </div>
      </BaseModal>

      {/* Header & Search */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center'
      }}>
        <h3 style={{ marginLeft: 10 }}>Danh sách xe đang sửa chữa</h3>
        
        <div style={{
          display: "flex",
          alignItems: "center",
        }}>
          <AiOutlineSearch />
          <Input
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 230,
              margin: "10px 10px",
              marginRight: "25px",
              borderRadius: 7
            }}
            placeholder="Tìm xe đang sửa..."
          />
        </div>
      </div>

      {/* Table */}
      <TableBase
        columns={columns}
        dataSource={filteredData}
        emptyText="Không có xe nào đang sửa chữa"
      />
    </div>
  )
}

export default RepairCar