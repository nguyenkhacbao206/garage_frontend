import { useEffect, useState } from "react"
import BaseModal from "../../components/baseModal"
import Button from "../../components/Button"
import TableBase, { Column, ITableBase } from "../../components/BaseTable"
import Form, { Input } from "../../components/FormBase";
import { getCustomers } from "../../services/api/customerApi";
import { notify } from "../../components/Notification";
import Select from "../../components/Select";


const DashBoard = () => {
  const [is, setIs] = useState(false)
  const [data, setData] = useState<any>()
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    getCustomers().then(res => { setData(res?.data) })
  }, [])

  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "rhre", label: "Gjhjrape" },
    { value: "hhhhnh", label: "Grjhjape" },
    { value: "nhngn", label: "Grakkpe" },
    { value: "grnjhjape", label: "Gra,,,pe" },
    { value: "grahh pe", label: "Grapmbe" },
  ];

  const onSub = (value: any) => {
    console.log(value)
  }

  return (
    <div>
      <BaseModal isOpen={is} closeModal={() => { setIs(false) }}>
        <div>click làm chó</div>
        <div>click làm chó</div>
        <b>bạn là con chó
        </b>
      </BaseModal>
      <Button type={"gradientPrimary"} onClick={() => { notify({ type: 'info', title: 'Đúng vậy', description: 'Bảo bị bysexual thật' }) }}>+ click đi</Button>
      <hr />
      <div>
        <h3>Single Select:</h3>
        <Form onFinish={onSub} initialValues={{ mm: ["apple", "banana"] }}>
          <Select name='mm' options={options} multiple />
          <Form.Input name="kkk"></Form.Input>
          <Button htmlType="submit">++</Button>
        </Form>
      </div>

      <div>
        <h3>Single Select:</h3>
        <select multiple>
          {options.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>
      </div>
      <hr></hr>
      <hr></hr>
      <Form
        initialValues={{ username: "minh", password: "" }}
        onFinish={(values) => console.log("✅ Submitted:", values)}
      >

        <Form.Input name="username" placeholder="Username" />
        <Form.Input name="password" type="password" placeholder="Password" disabled />

        <Button
          htmlType="submit"
        >
          Submit
        </Button>
      </Form>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
      <p>Bảo là cậu bé Down made in china</p>
    </div>
  )
}

export default DashBoard