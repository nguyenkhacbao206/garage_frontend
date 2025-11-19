import { Col, Container, Row } from "react-bootstrap";
import React from "react";
import Form from "../../../components/FormBase";
import Button from "../../../components/Button";
import { notify } from "../../../components/Notification";
import { postCar, putCar } from "../../../services/api/carApi";
import CustomerSelect from "../../khach-hang/components/select";

interface IFormCar {
  valueInitial?: MCar.IResponse;
  method: "post" | "put";
  setIsModal?: (a: boolean) => void;
  isReload?: boolean;
  setIsReload?: (a: boolean) => void;
}

const FormCar = ({ valueInitial, method, setIsModal, isReload, setIsReload }: IFormCar) => {
  const onSubmit = async (data: MCar.IResponse) => {
    const payload: MCar.IRequest = {
      plate: data.plate,
      model: data.model || "",
      manufacturer: data.manufacturer || "",
      description: data.description || "",
      customerId: method === "post" ? data.customerId : valueInitial?.customerId || "",
    };

    let res: any;

    if (method === "post") {
      res = await postCar(payload as any);
    } else {
      if (!valueInitial?.id) return;
      res = await putCar(valueInitial.id, payload as any);
    }

    if (res?.success) {
      notify({
        title: "Thành công",
        type: "success",
        description: method === "post" ? "Đã thêm xe thành công" : "Thông tin xe đã được cập nhật",
      });
      setIsReload?.(!isReload);
      setIsModal?.(false);
    } else {
      notify({ title: "Lỗi", type: "error", description: res?.message || "Có lỗi xảy ra" });
    }
  };

  return (
    <Container style={{ maxWidth: "500px" }}>
      <h5 style={{ marginBottom: 20 }}>
        {method === "post" ? "Thêm xe mới" : "Chỉnh sửa thông tin xe"}
      </h5>

      <Form initialValues={valueInitial} onFinish={onSubmit}>
        <Row className="gy-3 gx-3">
          <Col sm={12}>
            <label className="form-label required mb-1">Khách hàng</label>
            {method === "post" ? (
              <CustomerSelect 
                method={method}
                name="customerId" />
            ) : (
              <Form.Input name="customerCode" disabled />
            )}
          </Col>

          <Col sm={12}>
            <label className="form-label required mb-1">Biển số xe</label>
            <Form.Input name="plate" placeholder="VD: 30A-12345" required />
          </Col>

          <Col sm={12}>
            <label className="form-label mb-1">Hãng xe</label>
            <Form.Input name="manufacturer" placeholder="VD: Toyota" />
          </Col>

          <Col sm={12}>
            <label className="form-label mb-1">Mẫu xe</label>
            <Form.Input name="model" placeholder="VD: Vios" />
          </Col>

          <Col sm={12}>
            <label className="form-label mb-1">Mô tả</label>
            <Form.Input name="description" placeholder="Mô tả" />
          </Col>
        </Row>

        <div style={{ textAlign: "end", margin: "15px 10px" }}>
          <Button htmlType="submit" type="gradientPrimary">
            {method === "post" ? "Thêm mới" : "Lưu"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default FormCar;
