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
import { Link } from "react-router-dom";

const states = {
  delivered: "success",
  pending: "warning",
  cancelled: "secondary",
};
var dateFormat = require("dateformat");


export default function TableComponent({ data }) {
  const classes = useStyles();
  var keys = ['No.', 'Name', 'Phone', 'Price', 'Payment Method', 'Address', 'Order Placed On', 'Status'];

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
        {data.map(({ id, order_to_name, phone, prize, paymentMethod, address, updatedAt, status }, i) => (
          <TableRow key={i}>
            <TableCell className="pl-3 fw-normal">{i + 1}</TableCell>
            <TableCell className="pl-3 fw-normal">
              <Link to={'/app/order-view/' + id}>
                {order_to_name}</Link></TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell>${prize}</TableCell>
            <TableCell>{paymentMethod}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{dateFormat(updatedAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</TableCell>
            <TableCell>
              <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
