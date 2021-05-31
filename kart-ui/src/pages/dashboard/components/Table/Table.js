import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Chip
} from "@material-ui/core";
import useStyles from "../../styles";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = ['No.', 'Name', 'Phone', 'Price', 'Payment Method', 'Address', 'Date', 'Status'];
  // if (data[0]) {
  //   keys = Object.keys(data[0]).map(i => i.toUpperCase());
  //   keys.shift(); // delete "id" key
  // }


  return (
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map(key => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(({ order_to_name, phone, prize, paymentMethod, address, updatedAt, status }, i) => (
          <TableRow key={i}>
            <TableCell className="pl-3 fw-normal">{i+1}</TableCell>
            <TableCell className="pl-3 fw-normal">{order_to_name}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>${prize}</TableCell>
            <TableCell>{paymentMethod}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{updatedAt}</TableCell>
            <TableCell>
              <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
