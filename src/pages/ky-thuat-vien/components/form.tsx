import { Col, Container, Row } from "react-bootstrap"
import Form from "../../../components/FormBase" 
import Button from "../../../components/Button" 
import { postTechnician, putTechnician } from "../../../services/api/techniciansApi"
import { notify } from "../../../components/Notification"


interface IFormTechnician {
  valueInitial?: MTechnician.IRecord
  method: "post" | "put"
  setIsModal?: (a: boolean) => void
  isReload?: boolean
  setIsReload?: (a: boolean) => void
}

const FormTechnician = ({ valueInitial, method, setIsModal, isReload, setIsReload }: IFormTechnician) => {
  
  const onSubmit = async (data: MTechnician.IRecord) => {

    const payload: MTechnician.IRequest = {
      name: data.name,
      phone: data.phone,
      baseSalary: Number(data.baseSalary),
      position: data.position || "",
      userId: data.userId || ""
    }

    let res
    if (method === "post") {
      res = await postTechnician(payload)
    } else {
      if (!valueInitial?.id) return
      res = await putTechnician(valueInitial.id, payload)
    }

    if (res?.success) {
      notify({
        title: "Success",
        type: "success",
        description: method === "post" ? "Đã thêm kỹ thuật viên" : "Đã cập nhật kỹ thuật viên",
      })
      setIsReload?.(!isReload)
      setIsModal?.(false)
    } else {
      notify({ title: "Error", type: "error", description: (res as any)?.message || "Có lỗi xảy ra" })
    }
  }

  return (
    <Container style={{ maxWidth: "550px" }}>
      <h5 style={{ marginBottom: 20 }}>{method === "post" ? "Thêm kỹ thuật viên mới" : "Chỉnh sửa kỹ thuật viên"}</h5>
      <Form initialValues={valueInitial} onFinish={onSubmit}>
        <Row className="gy-2 gx-0">
          <Col sm={12}>
            <label className="form-label required" style={{ margin: 5 }}>Tên kỹ thuật viên</label>
            <Form.Input name="name" placeholder="Tên kỹ thuật viên" required />
          </Col>
          <Col sm={12}>
            <label className="form-label required" style={{ margin: 5 }}>Số điện thoại</label>
            <Form.Input name="phone" placeholder="Số điện thoại" type="tel" required />
          </Col>
          <Col sm={12}>
            <label className="form-label required" style={{ margin: 5 }}>Lương cơ bản (VNĐ)</label>
            <Form.Input name="baseSalary" placeholder="Lương cơ bản" type="number" required />
          </Col>
          <Col sm={12}>
            <label className="form-label" style={{ margin: 5 }}>Chức vụ</label>
            <Form.Input name="position" placeholder="Chức vụ" />
          </Col>
        </Row>
        <div style={{ textAlign: "end", margin: "15px 10px" }}>
          <Button htmlType="submit" type="gradientPrimary">{method === "post" ? "Thêm mới" : "Lưu"}</Button>
        </div>
      </Form>
    </Container>
  )
}

export default FormTechnician