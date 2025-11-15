import { Col, Container, Row } from "react-bootstrap"
import Form from "../../../components/FormBase"
import Button from "../../../components/Button"
import { postService, putService } from "../../../services/api/servicesApi"
import { notify } from "../../../components/Notification"

interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  status?: number
  data?: T
}

interface IFormService {
  valueInitial?: MService.IRecord
  method: "post" | "put"
  setIsModal?: (a: boolean) => void
  isReload?: boolean
  setIsReload?: (a: boolean) => void
}

const FormService = ({ valueInitial, method, setIsModal, isReload, setIsReload }: IFormService) => {
const onSubmit = async (data: MService.IRecord) => {
  const payload: MService.IRecord = {
    id: valueInitial?.id || "",
    name: data.name,
    price: Number(data.price),
    description: data.description
  }

  if (method === "post") {
    const res = await postService(payload)
    if (res.success) {
      notify({ title: "Success", type: "success", description: "Đã thêm dịch vụ thành công" })
      setIsReload?.(!isReload)
      setIsModal?.(false)
    } else {
      notify({ title: "Error", type: "error", description: res.message })
    }
  } else if (method === "put") {
    if (!valueInitial?.id) return
    const res = await putService(valueInitial.id, payload)
    if (res.success) {
      notify({ title: "Success", type: "success", description: "Thông tin dịch vụ đã được cập nhật" })
      setIsReload?.(!isReload)
      setIsModal?.(false)
    } else {
      notify({ title: "Error", type: "error", description: res.message })
    }
  }
}


  return (
    <Container style={{ maxWidth: "550px" }}>
      <h5 style={{ marginBottom: 20 }}>{method === "post" ? "Thêm dịch vụ mới" : "Chỉnh sửa dịch vụ"}</h5>
      <Form initialValues={valueInitial} onFinish={onSubmit}>
        <Row className="gy-2 gx-0">
          <Col sm={12}>
            <label className="form-label required" style={{ margin: 5 }}>Tên dịch vụ</label>
            <Form.Input name="name" placeholder="Tên dịch vụ" required />
          </Col>
          <Col sm={12}>
            <label className="form-label required" style={{ margin: 5 }}>Giá (VNĐ)</label>
            <Form.Input name="price" placeholder="Giá dịch vụ" type="number" required />
          </Col>
          <Col sm={12}>
            <label className="form-label" style={{ margin: 5 }}>Mô tả</label>
            <Form.Input name="description" placeholder="Mô tả" />
          </Col>
        </Row>
        <div style={{ textAlign: "end", margin: "15px 10px" }}>
          <Button htmlType="submit" type="gradientPrimary">{method === "post" ? "Thêm mới" : "Lưu"}</Button>
        </div>
      </Form>
    </Container>
  )
}

export default FormService
