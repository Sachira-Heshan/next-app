import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Customer } from "./index";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { BSONTypeError } from "bson";
import { getCustomer } from "../api/customers/[id]";

type Props = {
  customer: Customer;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths = async () => {
  // const result = await clientPromise;
  // const paths = result;
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  try {
    const data = await getCustomer(params.id);
    if (!data) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }
    return {
      props: {
        customer: JSON.parse(JSON.stringify(data)),
      },
      revalidate: 60,
    };
  } catch (e) {
    console.log(e);
    if (e instanceof BSONTypeError) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
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
