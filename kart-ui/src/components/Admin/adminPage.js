

import React, { useState, useEffect } from "react";
import { Router, Route, Link } from 'react-router-dom';

import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem,
  Button,
  Typography
} from "@material-ui/core";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';

import { getMyProducts } from './services/admin.service'

import PageTitle from "../../components/PageTitle";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export default function Admin(props) {

  const [products, setProducts] = useState([]);

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getMyProducts().then(res => {
      setProducts(res);
      setisLoading(false)
    })
    return () => { }
  }, [])

  return <>
    <PageTitle title="My Products" button={<Link to="/app/product/create" style={{ textDecoration: 'none' }}><Button
      variant="contained"
      size="medium"
      color="secondary"
    >
      Add new
      </Button> </Link>} />
    {!isLoading && <Grid><List component="nav" aria-label="main mailbox folders">
      {products.map(product => <><Link to={'/app/product/edit/' + product.id} style={{ textDecoration: 'none' }} key={product.id}><ListItem button >
        <ListItemIcon>
          <AvatarGroup max={2}>
            {product.images.map(image => <Avatar alt="Remy Sharp" src={'http://localhost:5000/' + image.path} />)}
          </AvatarGroup>
        </ListItemIcon>
        <ListItemText style={{ margin: '0 40px' }} primary={product.name} secondary={<React.Fragment>
          <Typography variant="subtitle2">{'$ ' + product.prize} {', Stock:'+ product.stock}</Typography>
        </React.Fragment>} />
      </ListItem>
        <Divider />
      </Link>
      </>)}
    </List>
    </Grid>}
  </>
}
