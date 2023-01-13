import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import { getCustomers } from "../api/customers";
import { GetStaticProps, NextPage } from "next/types";
import { Customer, Order } from "../customers";
import { useRouter } from "next/router";
import { ObjectId } from "mongodb";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Order ID",
    type: "string",
    width: 100,
  },
  {
    field: "customerId",
    headerName: "Customer ID",
    type: "string",
    width: 100,
  },
  {
    field: "customerName",
    headerName: "Customer",
    type: "string",
    width: 150,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 200,
    editable: true,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 110,
    sortable: true,
  },
];

interface OrderRow extends Order {
  customerName: string;
  customerId?: ObjectId | string;
  id?: ObjectId | string;
}

type Props = {
  orders: Order[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await getCustomers();
  let orders: OrderRow[] = [];
  data.forEach((customer: Customer) => {
    if (customer.orders) {
      customer.orders.forEach((order: Order) => {
        orders.push({
          ...order,
          customerName: customer.name,
          customerId: customer._id?.toString(),
          id: order._id.toString(),
        });
      });
    }
  });
  return {
    props: {
      orders: orders,
    },
    revalidate: 60,
  };
};

const Orders: NextPage<Props> = (props) => {
  const { customerId } = useRouter().query;
  return (
    <Container>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          filterModel={{
            items: [
              {
                columnField: "customerId",
                operatorValue: "equals",
                value: customerId,
              },
            ],
          }}
          rows={props.orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            filter: {
              filterModel: {
                items: [
                  {
                    columnField: "customerId",
                    operatorValue: "equals",
                    value: customerId,
                  },
                ],
              },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default Orders;
