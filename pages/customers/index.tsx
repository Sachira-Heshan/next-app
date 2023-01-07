import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import axios from "axios";
import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";

export type Customer = {
  _id: ObjectId;
  name: string;
  industry: string;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const mongoClient = await clientPromise;

  const data = await mongoClient.db().collection("customers").find().toArray();
  console.log("hehe", data);

  return {
    props: {
      customers: JSON.parse(JSON.stringify(data)),
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
