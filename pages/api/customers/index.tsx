/* eslint-disable import/no-anonymous-default-export */
import { Raleway } from "@next/font/google";
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { Customer, Order } from "../../customers/index";
import NextCors from "nextjs-cors";

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

export const addCustomer = async (customer: Customer): Promise<ObjectId> => {
  const mongoClient = await clientPromise;
  const response = await mongoClient
    .db()
    .collection("customers")
    .insertOne(customer);
  return response.insertedId;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ObjectId | { error: string }>
) => {
  await NextCors(req, res, {
    methods: ["GET", "POST"],
    origin: "*",
    optionsSuccessStatus: 200,
  });
  if (req.method === "GET") {
    const data = await getCustomers();
    res.status(200).json({ customers: data });
  } else if (req.method === "POST") {
    console.log(req.body);
    if (req.body.name && req.body.industry) {
      const customer: Customer = {
        name: req.body.name,
        industry: req.body.industry,
        orders: req.body.orders.map((order: Order) => {
          return {
            ...order,
            _id: new ObjectId(),
          };
        }),
      };
      const insertedId = await addCustomer(customer);
      res.revalidate("/customers");
      res.revalidate("/customers/" + insertedId);
      res.status(200).json(insertedId);
    } else {
      res.status(400).json({ error: "name and industry is required!" });
    }
  }
};
