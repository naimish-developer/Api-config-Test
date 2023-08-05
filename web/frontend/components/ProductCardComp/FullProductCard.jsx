import React from 'react'
import TitleCmp from './TitleCmp'
import { Frame, Grid, LegacyCard, PageActions, } from '@shopify/polaris'
import DropZoneWithImageFileUpload from './DropZone'
import SelectExample from './ProductStatus';
import Variants from './Variants';
const FullProductCard = ({data}) => {

//   const imgsrc=data.images?.map(value,index=>{
// value.src
//   })
  return (
    <>
      <Frame>
        <Grid>
          <Grid.Cell
            gap={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }}
            columnSpan={{ xs: 6, sm: 6, md: 6, lg: 8, xl: 8 }}
          >
            <LegacyCard sectioned>
              <TitleCmp
                data={{
                  title: data.title || "",
                  body_html: data.body_html || "",
                }}
              ></TitleCmp>
            </LegacyCard>
            <LegacyCard sectioned title="Media">
              <DropZoneWithImageFileUpload media={[...data.images]} />
            </LegacyCard>
            <LegacyCard title="Variant">
              <Variants options={[...data.options]} />
            </LegacyCard>
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
            <LegacyCard sectioned>
              <SelectExample status={data.status}></SelectExample>
            </LegacyCard>
          </Grid.Cell>
        </Grid>
        <PageActions
          primaryAction={{
            content: "Save",
          }}
          secondaryActions={[
            {
              content: "Delete",
              destructive: true,
            },
          ]}
        />
      </Frame>
    </>
  );
}

export default FullProductCard