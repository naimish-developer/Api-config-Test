import { useState } from "react";

import { useAuthenticatedFetch } from "../hooks";
import { useEffect } from "react";
import { IndexFiltersDefaultExample } from "./ProductsCards";
import {
  Card,
  HorizontalStack,
  Layout,
  LegacyStack,
  Page,
  Spinner,
  Stack,
} from "@shopify/polaris";

export function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [Productsdata, setProductsdata] = useState([]);
  const fetch = useAuthenticatedFetch();

  useEffect(() => {
    const fetchdata = async () => {
      setIsLoading(true);
      try {
        const responce = await fetch("/api/products");
        const { data } = await responce.json();
        setProductsdata(data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchdata();
  }, []);

  return (
    <>
        <Layout>
          <Layout.Section>
            <Card>
              {!isLoading ? (
                <IndexFiltersDefaultExample
                  data={Productsdata}
                ></IndexFiltersDefaultExample>
              ) : (
                <HorizontalStack align="center">
                  <Spinner accessibilityLabel="Products Loading" size="large" />
                </HorizontalStack>
              )}
            </Card>
          </Layout.Section>
        </Layout>
    </>
  );
}
