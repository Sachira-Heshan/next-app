import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import axios from "axios";
import { ObjectId } from "mongodb";
import { getCustomers } from "../api/customers/index";
import { useQuery } from "react-query";

import CustomerComponent from "../../components/Customer";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

export type Customer = {
  _id?: ObjectId;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getCustomers();

  return {
    props: {
      customers: data,
    },
    revalidate: 30,
  };
};

const Customers: NextPage = ({
  c,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const query = useQuery(
    ["customers"],
    () => {
      return axios("/api/customers");
    },
    {
      initialData: c,
    }
  );
  const customers = query?.data?.data?.customers;
  if (customers) {
    return (
      <>
        <Container>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {customers.map((customer: Customer) => {
              return (
                <CustomerComponent
                  key={customer._id?.toString()}
                  customer={customer}
                />
              );
            })}
          </Grid>
        </Container>
      </>
    );
  }
  return null;
};

export default Customers;
