import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import { getCustomers } from "../api/customers/index";

export type Customer = {
  _id: ObjectId;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const data = await getCustomers();

  return {
    props: {
      customers: data,
    },
    revalidate: 60,
  };
};

const Customers: NextPage = ({
  customers,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <div>
        <h4>Customers</h4>
        {customers.map((customer: Customer) => {
          return (
            <div key={customer._id.toString()}>
              <br></br>
              <p>{customer._id.toString()}</p>
              <p>{customer.name}</p>
              <p>{customer.industry}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Customers;
