import { Select } from "@shopify/polaris";
import { useState, useCallback } from "react";

export default function SelectExample({status}) {
  const [selected, setSelected] = useState(status);

  const handleSelectChange = useCallback(
    (value) => setSelected(value),
    []
  );

  const options = [
    { label: "Active", value: "active" },
    { label: "Draft", value: "draft" },
  ];

  return (
    <Select
      label="Status"
      options={options}
      onChange={handleSelectChange}
      value={selected}
    />
  );
}
