import { AiOutlineDelete, AiOutlineEdit, AiOutlineSearch } from "react-icons/ai"
import Button from "../../../components/Button"
import { Input } from "../../../components/FormBase"
import TableBase, { Column } from "../../../components/BaseTable"
import { useEffect, useState } from "react"
import BaseModal from "../../../components/baseModal"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { notify } from "../../../components/Notification"
import { ColorStyle } from "../../../styles/colors"

import { deleteCar, getCar } from "../../../services/api/carApi"
import FormCar from "./formlistcar"

const ListCars = () => {

  const [dataCar, setDataCar] = useState<MCar.IResponse[]>([])
  // const [loading, setLoading] = useState<boolean>(true)
  const [isReload, setIsReload] = useState<boolean>(false)
  const [isModal, setIsModal] = useState<boolean>(false)
  const [isModalDel, setIsModalDel] = useState<boolean>(false)
  const [idCarDel, setIdCarDel] = useState<string>("")
  const [method, setMethod] = useState<"post" | "put">("post")
  const [dataCarId, setDataCarId] = useState<MCar.IResponse>()
  const [search, setSearch] = useState<string>("")

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
      title: "Mã KH",
      dataIndex: "customerCode",
      width: 120
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      width: 300
    },
    {
      title: "Thao tác",
      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", justifyContent: "center", gap: 5 }}>
          <Button
            onClick={() => { setIdCarDel(record.id); setIsModalDel(true); }}
            type="error"
            style={{ padding: 0, width: 23, height: 23 }}
          >
            <AiOutlineDelete />
          </Button>
          <Button
            onClick={() => setModal(record, "put")}
            type="primary"
            style={{ padding: 0, width: 23, height: 23 }}
          >
            <AiOutlineEdit />
          </Button>
        </div>
      )
    },
  ]

  useEffect(() => {
    getCar().then(res => {
      setDataCar(res?.data ?? [])
      // setLoading(false)
    })
  }, [isReload])

  // Xóa
  const delModal = async (id: string) => {
    const res = await deleteCar(id)
    if (res.success) {
      notify({ title: "Delete", type: "error", description: "Đã xóa xe thành công" })
      setIsModalDel(false)
      setIsReload(!isReload)
    } else {
      notify({ title: "Delete", type: "error", description: res.message || "Xóa không thành công" })
      setIsModalDel(false)
    }
  }

  // Mở modal add/edit
  const setModal = (data?: MCar.IResponse, method?: "post" | "put") => {
    setDataCarId(data)
    setMethod(method || "post")
    setIsModal(true)
  }

  // Lọc theo search
  const filteredData = dataCar.filter(car => {
    const s = search.toLowerCase()
    return (
      car.plate.toLowerCase().includes(s) ||
      car.manufacturer.toLowerCase().includes(s) ||
      car.model.toLowerCase().includes(s)
    )
  })

  return (
    <>
      {/* Modal thêm/sửa */}
      <BaseModal isOpen={isModal} closeModal={() => setIsModal(false)}>
        <FormCar
          isReload={isReload}
          setIsReload={setIsReload}
          valueInitial={dataCarId}
          method={method}
          setIsModal={setIsModal}
        />
      </BaseModal>

      {/* Modal xác nhận xoá */}
      <BaseModal isOpen={isModalDel} closeModal={() => setIsModalDel(false)}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}>
          <IoIosCloseCircleOutline style={{ fontSize: 70, color: ColorStyle.Error }} />
          <h5>Are you sure ?</h5>
          <p>Bạn có chắc chắn muốn xóa xe này?</p>
          <div>
            <Button style={{ marginRight: 10 }} onClick={() => setIsModalDel(false)}>Cancel</Button>
            <Button type="error" onClick={() => delModal(idCarDel)}>Confirm</Button>
          </div>
        </div>
      </BaseModal>

      {/* Table */}
      <div style={{ margin: "50px 0" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: 'center'
        }}>
          <h3 style={{ marginLeft: 10 }}>Danh sách xe</h3>
          <Button
            onClick={() => setModal(undefined, "post")}
            type="gradientPrimary"
            style={{ padding: "9px 20px", marginRight: 10, }}
          >
            + Thêm xe
          </Button>
        </div>

        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end"
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
            placeholder="Tìm theo biển số, hãng..."
          />
        </div>

        <TableBase
          columns={columns}
          dataSource={filteredData}
          // loading={loading}
        />
      </div>
    </>
  )
}

export default ListCars
