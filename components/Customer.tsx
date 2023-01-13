import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import PersonIcon from "@mui/icons-material/Person";

import { Customer } from "../pages/customers/index";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const Customer = ({ customer }: { customer: Customer }) => {
  return (
    <Grid item>
      <div key={customer._id?.toString()}>
        <br></br>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Tooltip title={customer._id?.toString()}>
            <PersonIcon fontSize="small" style={{ marginRight: 5 }} />
          </Tooltip>
          {customer.name}
        </span>
        <p>{customer.industry}</p>
        <Link
          style={{ textDecoration: "none" }}
          href={{
            pathname: "/orders",
            query: {
              customerId: customer._id?.toString(),
            },
          }}
        >
          <Button variant="contained">View Orders</Button>
        </Link>
      </div>
    </Grid>
  );
};

export default Customer;
