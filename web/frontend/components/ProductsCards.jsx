
import {
  Avatar,
  Button,
  ButtonGroup,
  
  Icon,
  IndexTable,
 
} from '@shopify/polaris';
import { ViewMajor } from "@shopify/polaris-icons";
import { useNavigate } from "@shopify/app-bridge-react";

export function IndexFiltersDefaultExample({data}) {
const navigate = useNavigate();

  const rowMarkup = data.map(
    ({ id, image, title, created_at, status }, index) => (
      <IndexTable.Row key={id}>
        <IndexTable.Cell> {id}</IndexTable.Cell>
        <IndexTable.Cell>
          <Avatar customer name={title} source={image?.src} />
        </IndexTable.Cell>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{created_at.split("T")[0]}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>
          <ButtonGroup>
            {status === "draft" ? (
              <>
                <Button primary>Active</Button>
              </>
            ) : (
              <>
                <Button style={{ color: "var(--p-color-bg-primary-hover)" }}>
                  Draft
                </Button>
              </>
            )}
            
            <Button
              onClick={() => {
                navigate(`/${id}`);
              }}
            >
              <Icon source={ViewMajor} color="base" accessibilityLabel="View" />
            </Button>
          </ButtonGroup>
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );
  const resourceName = {
    singular: "data",
    plural: "datas",
  };

  return (
        <IndexTable
          resourceName={resourceName}
          itemCount={data.length}
          selectable={false}
          headings={[
            { title: "ID" },
            { title: "Img" },
            { title: "product" },
            { title: "Date" },
            { title: "status" },
            { title: "Action" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
  );
      }
 