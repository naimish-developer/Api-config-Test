import {
  Page,
  Layout,
} from "@shopify/polaris";

import { Products } from "../components";

export default function HomePage() {
  
  return (
    <Page fullWidth title="Products">
      <Layout>
        <Layout.Section>
          <Products />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
