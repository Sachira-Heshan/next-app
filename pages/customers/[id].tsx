import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Customer } from "./index";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

type Props = {
  customer: Customer;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths = async () => {
  const result = await axios.get("http://127.0.0.1:8000/api/customers");
  const paths = result.data.customers.map((customer: Customer) => {
    return {
      params: {
        id: customer._id.toString(),
      },
    };
  });

  return {
    paths: paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db()
    .collection("customers")
    .findOne({ _id: new ObjectId(params.id) })) as Customer;
  console.log("haha", data);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      customer: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 60,
  };
};

const Customer: NextPage<Props> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  if (router.isFallback) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div>
        <h4>Customer {props.customer.name}</h4>
      </div>
    </>
  );
};

export default Customer;
