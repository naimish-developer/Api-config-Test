import {
  AlphaCard,
  Button,
  Card,
  DataTable,
  Divider,
  Grid,
  HorizontalGrid,
  HorizontalStack,
  Icon,
  LegacyCard,
  Tag,
  Text,
  TextField,
  Toast,
} from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";
import React, { useCallback, useMemo, useState } from "react";
import { AddMajor } from "@shopify/polaris-icons";
// import { Toast } from "@shopify/polaris/build/ts/latest/src/components/Frame/components";
const Variants = ({ options }) => {

  const [lengthOFverient, setlengthOFverient] = useState([...options] || [{name:"option",values:["value"]}]);
  const [Edit, setEdit] = useState(null);
  const [Error, SetError] = useState(false);
  // const [OptionAll, setOptionAll] = useState(null);
  const rows = [
    ["Emerald Silk Gown", "$875.00", 124518],
    ["Mauve Cashmere Scarf", "$230.00", 124518],
    [
      "Navy Merino Wool Blazer with khaki chinos and yellow belt",
      "$445.00",
      124518,
    ],
  ];

//  Add variants card

  const addOptionhendler = () => {
    const lengthop = lengthOFverient.length > 0 ? lengthOFverient.length - 1 : lengthOFverient.length;
    if (
      lengthOFverient[lengthop]?.name !== "" || lengthOFverient[lengthop]?.values !== [""]
    ) {
      setlengthOFverient((old) => [...old,{ name:"",  values: [""] },]);
    } else {
      SetError(true);
    }
    setEdit(lengthOFverient.length);
  };

  // Update varient`s value
  const AddOptionValue = (names,e, pindex, cindex) => {
     const updatedData = lengthOFverient.map((obj,i) => {
       if (obj.name === names && i === pindex ) {
         const updatedValues = [...obj.values, obj.values[cindex]=e]         
         return { ...obj, values: updatedValues };
       }
       return obj;
     });

    setlengthOFverient((old)=>[...old ,...updatedData ]);
  };
  // Update value of  Otion Values
  const OptionChangHendler = (e, pindex) => {
    // 
    const changdata = { ...lengthOFverient[pindex], name: e };
        const updatedData = [...lengthOFverient.slice(0, pindex),changdata,...lengthOFverient.slice(pindex + 1),
        ];
    setlengthOFverient( updatedData);  
  };

  // Option Delete
  const OptionDeleteHendler = (id) => {
    const remailoption = lengthOFverient.filter((val) => val.id !== id);
    setlengthOFverient(remailoption);
  };
  //  Delete each  Option Values
  const OtionValuDeleteHendler = (pindex, cindex, val) => {;
    const newdata = lengthOFverient.map((val,index)=>{
const newobj = val.filter((oval, index) => index !== cindex);

      return newobj
    })
    const remailoption = lengthOFverient[pindex].values.filter(
      (oval, index) => index !== cindex
    );
    setlengthOFverient((old) => [...old, ...remailoption]);
  };

  // Add Empty Otion Value
  // const AddOptionValueAdd = (pindex,cindex,val) => {
  //   if (
  //     lengthOFverient[pindex]?.values.length - 1 === cindex || lengthOFverient[pindex]?.values.length === 0
  //   ) {
  // 
  // setlengthOFverient(newData);
  //   }
  // };
  return (
    <>
      {Error && (
        <Toast
          content="Plese Fill All Filde Of Variants option"
          error
          onDismiss={() => {
            SetError(false);
          }}
        />
      )}
      {lengthOFverient &&
        lengthOFverient?.map((val, pindex) => {
          return (
            <div key={pindex}>
              <LegacyCard sectioned>
                {Edit === pindex ? (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <h6 style={{ marginBottom: "5px" }}>Options name</h6>
                      <Grid>
                        <Grid.Cell
                          columnSpan={{ xs: 5, sm: 5, md: 5, lg: 11, xl: 11 }}
                        >
                          <TextField
                            value={val.name}
                            onChange={(e) => OptionChangHendler(e, pindex)}
                          ></TextField>
                        </Grid.Cell>

                        <Grid.Cell
                          columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
                        >
                          <Button onClick={() => OptionDeleteHendler(val.id)}>
                            <Icon source={DeleteMinor} color="base" />
                          </Button>
                        </Grid.Cell>
                      </Grid>
                    </div>
                    <Text variant="bodySm" as="p">
                      Option value
                    </Text>
                  </>
                ) : (
                  <HorizontalStack align="space-between">
                    <Text variant="bodyMd" as="h5">
                      {val.name}
                    </Text>
                    <Button onClick={() => setEdit(pindex)}>Edit</Button>
                  </HorizontalStack>
                )}
                {val?.values?.map((inerval, cindex) => {
                  return Edit === pindex ? (
                    <div
                      key={cindex}
                      style={{ marginTop: "10px", marginBottom: "10px" }}
                    >
                      <Grid>
                        <Grid.Cell
                          columnSpan={{ xs: 5, sm: 5, md: 5, lg: 11, xl: 11 }}
                        >
                          <TextField
                            value={inerval}
                            // onFocus={() => AddOptionValueAdd(pindex, cindex)}
                            onChange={(e) =>
                              AddOptionValue(val.name, e, pindex, cindex)
                            }
                          ></TextField>
                        </Grid.Cell>

                        <Grid.Cell
                          columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
                        >
                          <Button
                            onClick={() =>
                              OtionValuDeleteHendler(pindex, cindex, inerval)
                            }
                          >
                            <Icon source={DeleteMinor} color="base" />
                          </Button>
                        </Grid.Cell>
                      </Grid>
                    </div>
                  ) : (
                    <span style={{ marginRight: "10px" }}>
                      <Tag>{inerval}</Tag>
                    </span>
                  );
                })}
                {Edit === pindex && (
                  <Button onClick={() => setEdit(null)}>Done</Button>
                )}
              </LegacyCard>
              <hr></hr>
            </div>
          );
        })}
      <Button plain fullWidth textAlign="left" onClick={addOptionhendler}>
        <Text fontWeight="semibold">
          <div style={{ display: "flex", gap: "10px" }}>
            <Icon source={AddMajor} color="base" />
            Add options like size or color
          </div>
        </Text>
      </Button>
      <LegacyCard>
        <DataTable
          columnContentTypes={["text", "numeric", "numeric"]}
          headings={["img", "Catogary", "Net sales"]}
          rows={rows}
        />
      </LegacyCard>
    </>
  );
};

export default Variants;
