import React, { createContext, useContext, useState } from "react";
import "./index.scss"

const FormContext = createContext<any>(null);

export interface IFormProps {
  initialValues?: Record<string, any>;
  onFinish?: (values: Record<string, any>) => void;
  className?: string;
  children: React.ReactNode;
}

export interface IFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  style?: React.CSSProperties,
}

// ===== Form =====
function Form(props: IFormProps) {
  const { initialValues = {}, onFinish, className = "", children } = props;
  const [values, setValues] = useState<Record<string, any>>(initialValues);

  const setFieldValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFinish?.(values);
  };

  return (
    <FormContext.Provider value={{ values, setFieldValue }}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

// ===== Form.Input =====
function FormInput({ name, style, ...rest }: IFormInputProps) {
  const { values, setFieldValue } = useContext(FormContext);

  return (
    <input
      {...rest}
      name={name}
      value={values[name] ?? ""}
      onChange={(e) => setFieldValue(name, e.target.value)}
      className="input-base"
      style={{ ...style }}
    />
  );
}

Form.Input = FormInput;

export default Form;