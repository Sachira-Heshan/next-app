/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

import { Customer } from "../../customers/index";

type Data = {
  customers: Customer[];
};

export const getCustomers = async (): Promise<Customer[]> => {
  const mongoClient = await clientPromise;

  const data = (await mongoClient
    .db()
    .collection("customers")
    .find()
    .toArray()) as Customer[];
  return JSON.parse(JSON.stringify(data));
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = await getCustomers();
  res.status(200).json({ customers: data });
};
