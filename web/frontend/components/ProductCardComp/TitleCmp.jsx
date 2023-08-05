import { Layout, LegacyCard, TextField } from "@shopify/polaris";
import React, { useState } from "react";

const TitleCmp = ({ data }) => {
  const [Titledata, setTitledata] = useState(data);

  const handleChange=()=>{

  }
  return (
    <>
      <TextField
        label="Title"
        value={Titledata.title}
        onChange={(e) => setTitledata(e)}
        autoComplete="off"
      ></TextField>
      <TextField
        label="Description"
        value={Titledata.body_html}
        onChange={handleChange}
        multiline={4}
        autoComplete="off"
      />
    </>
  );
};
export default TitleCmp;
