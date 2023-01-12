import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { getCustomers } from "../api/customers/index";
import { useQuery } from "react-query";

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
        <div>
          <h4>Customers</h4>
          {customers.map((customer: Customer) => {
            return (
              <div key={customer._id?.toString()}>
                <br></br>
                <p>{customer._id?.toString()}</p>
                <p>{customer.name}</p>
                <p>{customer.industry}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return null;
};

export default Customers;
