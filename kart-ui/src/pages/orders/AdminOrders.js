import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import Table from "../dashboard/components/Table/Table";

// data
import mock from "../dashboard/mock";

import { getOrders, getAllOrders } from "../checkout/services/order.service";

const datatableData = [
  ["Iphone 12", "Apple Inc.", "1000$", "Pending"],
  ["Iphone 12", "Apple Inc.", "1000$", "Pending"],
  ["Iphone 12", "Apple Inc.", "1000$", "Delivered"],
  ["Iphone 12", "Apple Inc.", "1000$", "Delivered"],
  ["Iphone 12", "Apple Inc.", "1000$", "Delivered"],
  ["Iphone 12", "Apple Inc.", "1000$", "Delivered"],
  ["Iphone 12", "Apple Inc.", "1000$", "Delivered"],
  ["Iphone 8", "Apple Inc.", "900$", "Delivered"],
  ["Acer Laptop", "Apple Inc.", "1500$", "Delivered"],
  ["Iphone Charger", "Apple Inc.", "100$", "Delivered"],
];

const useStyles = makeStyles(theme => ({
  tableOverflow: {
    overflow: 'auto'
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },
}))

export function AdminOrders() {
  const classes = useStyles();

  const role = localStorage.getItem('role')

  const [orders, setorders] = useState([])

  useEffect(() => {
    getAllOrders().then(res => {
      setorders(res)
    })
    return () => {

    }
  }, [])


  return (
    <>
      <PageTitle title="Orders" />
      <Grid container spacing={4}>
        {/* <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
            data={datatableData}
            columns={["Item", "Brand", "Price", "Status"]}
            options={{
              filterType: "checkbox",
            }}
          />
        </Grid> */}

        <Grid item xs={12}>
          <Widget title="Previous Orders" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
            <Table data={orders} />
          </Widget>
        </Grid>
        {/* <Grid item xs={12}>
        <Widget title="Previous Orders" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
          <Table data={mock.table} />
        </Widget>
      </Grid> */}
      </Grid>
    </>
  );
}
