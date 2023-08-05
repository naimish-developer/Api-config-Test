// import { useAuthenticatedFetch } from "../hooks";
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthenticatedFetch } from '../hooks';
import { Badge, HorizontalStack, Layout, LegacyCard, Page, Spinner } from '@shopify/polaris';
import FullProductCard from '../components/ProductCardComp/FullProductCard';
export default function ProductView () {
  const {id}= useParams();
  const [PoductDetails, setPoductDetails] = useState({})
  const [loading, setloading] = useState(true)
    const fetch = useAuthenticatedFetch();

    const fetchsepratProduct=async()=>{
      try {
        const responce = await fetch(`api/products/${id}`);
        const data = await responce.json();
        responce.ok && setPoductDetails(data);
        console.log(data); 

      } catch (error) {
        console.log(error);
      }
      setloading(false)
    }
    useEffect(() => {
  fetchsepratProduct()
 
}, [])
console.log(PoductDetails);

  return (
    <Page fullWidth
      backAction={{ content: "Products", url: "/" }}
      title={PoductDetails?.title || "Product"}
      secondaryActions={[
        PoductDetails.status === "Archive" || "Draft"
          ? {
              content: "Active",
              accessibilityLabel: "Active product",
              onAction: () => alert("Make Product Active "),
            }
          : {
              content: "Archive",
              accessibilityLabel: "Product Archive",
              onAction: () => alert("Make Product Archive"),
            },
      ]}
    >
      {/* <Badge className="color" size="small">Fulfilled</Badge> */}
      <Layout>
        <Layout.Section>
            {loading ? (
              <HorizontalStack align="center">
                <Spinner accessibilityLabel="Products Loading" size="large" />
              </HorizontalStack>
            ) : (
              <FullProductCard data={PoductDetails}></FullProductCard>
            )}
        </Layout.Section>
      </Layout>
    </Page>
  );
};

