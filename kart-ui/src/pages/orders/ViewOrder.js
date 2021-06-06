import React, { useState, useEffect } from "react";
import { Button, Card, Divider, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";


import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip
} from "@material-ui/core";

// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
// import Table from "../dashboard/components/Table/Table";

// data

import { getOrderById, getAllOrders, updateOrderStatus } from "../checkout/services/order.service";
import { useParams } from "react-router-dom";
import { Done } from "@material-ui/icons";


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

const states = {
    delivered: "success",
    pending: "warning",
    cancelled: "secondary",
};

var dateFormat = require("dateformat");

export function ViewOrder() {
    const classes = useStyles();

    const isAdmin = localStorage.getItem('role') == 'ADMIN';

    var { id } = useParams()

    const [order, setorder] = useState({})

    function updateOrderStatusS(status) {
        updateOrderStatus({ status }, id).then(res => {
            getOrderById(id).then(res => {
                setorder(res)
            })
        })
    }

    useEffect(() => {
        getOrderById(id).then(res => {
            setorder(res)
        })
        return () => {

        }
    }, [])


    return (
        <>
            <PageTitle title="Order Details" />
            <Grid container spacing={4}>
                <Card style={{ padding: '30px', width: '100%' }}>
                    <span>
                        <strong>Order Name : </strong>
                        <i>{order.order_to_name}</i>
                    </span>
                    <br></br>
                    <br></br>

                    <span>
                        <strong>Order Address : </strong>
                        <i>{order.address}</i>
                    </span>
                    <br></br>
                    <br></br>

                    <span>
                        <strong>Order Phone : </strong>
                        <i>{order.phone}</i>
                    </span>
                    <br></br>
                    <br></br>

                    <span>
                        <strong>Order Payment Status : </strong>
                        <i>Paid ({order.paymentMethod})</i>
                    </span>
                    <br></br>
                    <br></br>

                    <span>
                        <strong>Order Date : </strong>
                        <i>{dateFormat(order.createdAt, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</i>
                    </span>
                    <br></br>
                    <br></br>

                    <Typography variant="h5">Order Amount: ${order.prize}</Typography>

                    <br></br>
                    <span>
                        <strong>Order Status : </strong>
                        <Chip variant="outlined" classes={{ root: classes[states[order.status?.toLowerCase()]] }} label={order.status} />
                    </span>
                    <br></br>
                    <br></br>

                    <Divider />
                    <br></br>
                    <Typography variant="h4">Order Details</Typography>
                    <br></br>

                    <Table className="mb-0">
                        <TableHead>
                            <TableRow>
                                {['Sl No', 'Product Name', 'Price', 'Quantity'].map(key => (
                                    <TableCell key={key}>{key}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {order.orderItems && order.orderItems.map(({ id, product, quantity }, i) => (
                                <TableRow key={i}>
                                    <TableCell className="pl-3 fw-normal">{i + 1}</TableCell>
                                    <TableCell className="pl-3 fw-normal">
                                        {product.name}</TableCell>
                                    <TableCell>${product.prize * quantity}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow >
                                <TableCell className="pl-3 fw-normal"></TableCell>
                                <TableCell className="pl-3 fw-normal">
                                    <strong> Total </strong></TableCell>
                                <TableCell><strong>
                                    ${order.prize}
                                </strong></TableCell>
                                <TableCell></TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>

                    <br></br>

                    {order.status && order.status == 'Pending' && <Button variant="outlined" color="secondary" onClick={() => updateOrderStatusS('Cancelled')}>Cancel Order</Button>}
                    <br></br>
                    {order.status && order.status == 'Pending' && isAdmin && <Button variant="outlined" color="primary" style={{ marginTop: '30px' }} onClick={() => updateOrderStatusS('Delivered')}>Mark As Delivered</Button>}

                </Card>


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

                {/* <Grid item xs={12}>
                    <Widget title="Previous Orders" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
                        <Table data={orders} />
                    </Widget>
                </Grid> */}
                {/* <Grid item xs={12}>
        <Widget title="Previous Orders" upperTitle noBodyPadding bodyClass={classes.tableOverflow}>
          <Table data={mock.table} />
        </Widget>
      </Grid> */}
            </Grid>
        </>
    );
}
