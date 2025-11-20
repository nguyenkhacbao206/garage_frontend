import React, { useState, useEffect } from "react";
import Select, { Option } from "../../../components/Select";
import { getCustomers } from "../../../services/api/customerApi";

interface CustomerSelectProps {
  name: string;
  method: "post" | "put";
  valueInitial?: any;
  placeholder?: string;
  disabled?: boolean;
}

const CustomerSelect = ({ name, method, valueInitial, placeholder, disabled }: CustomerSelectProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    if (method === "post") {
      getCustomers().then((res: any) => {
        let dataArray: any[] = [];

        if (res.success && res.data) {
          dataArray = res.data;
        } else if (res.success) {
          const { success, ...dataObjects } = res;
          dataArray = Object.values(dataObjects);
        }

        const opts: Option[] = dataArray.map(cust => ({
          value: cust.id,
          label: `${cust.name} (${cust.customerCode})`,
        }));

        setOptions(opts);
      });
    } else if (method === "put" && valueInitial) {
      // Chỉ hiển thị option hiện tại để show trong Select khi edit
      setOptions([
        {
          value: valueInitial.customerId,
          label: `${valueInitial.customerName} (${valueInitial.customerCode})`,
        },
      ]);
    }
  }, [method, valueInitial]);

  return (
    <Select
      name={name}
      options={options}
      placeholder={placeholder || "Tìm khách hàng..."}
      // disabled={disabled}
    />
  );
};

export default CustomerSelect;