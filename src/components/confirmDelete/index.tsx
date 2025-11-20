import { IoIosCloseCircleOutline } from "react-icons/io"
import { ColorStyle } from "../../styles/colors"
import Button from "../Button"


interface IConfirmDelete {
  onCancel: () => void,
  onConfirm: () => void,
  title?: string,
  text?: string
}
const ConfirmDelete = ({ onCancel, onConfirm, title = "Are you sure ?", text = "are you sure you would like to do this" }: IConfirmDelete) => {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'column',
      marginBottom: 30
    }}>
      <IoIosCloseCircleOutline style={{ fontSize: 70, color: ColorStyle.Error }} />
      <h5>{title}</h5>
      <p>{text}</p>
      <div style={{ marginTop: 10 }}>
        <Button style={{ marginRight: 10, width: 150 }} onClick={onCancel}>Cancel</Button>
        <Button style={{ marginRight: 10, width: 150 }} onClick={onConfirm} type="error">Confirm</Button>
      </div>
    </div>
  )
}

export default ConfirmDelete