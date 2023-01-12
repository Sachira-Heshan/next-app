import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import PersonIcon from "@mui/icons-material/Person";

import { Customer } from "../pages/customers/index";

const Customer = ({ customer }: { customer: Customer }) => {
  return (
    <>
      <div key={customer._id?.toString()} style={{ marginBottom: 20 }}>
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
        <Button variant="contained">View Orders</Button>
      </div>
    </>
  );
};

export default Customer;
