import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  InputBase,
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  ClickAwayListener
} from "@material-ui/core";

import {
  Link
} from "react-router-dom";

import { Skeleton } from '@material-ui/lab'
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components
import PageTitle from "../../components/PageTitle";
import { getAllPoducts, getImageUrl } from './services/product.service'

import { getCartItems, addToCart, removeFromCart } from '../../components/Product/service/cart'


export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState([]);

  const [cartItems, setcartProductItems] = useState([]);

  const [searchKey, setSearchKey] = useState('');


  const [open, setOpen] = React.useState(false);


  function addToCartItem(product) {
    setIsLoading(true);
    addToCart({ product, quantity: 1 }).then(res => {
      setcartProductItems(cartItems.concat(product))
      setIsLoading(false);

    })
  }

  function removeFromCartItem(product) {
    setIsLoading(true);
    removeFromCart(product).then(res => {
      getCartItems().then(res => {
        setcartProductItems(res.map(r => r.productId));
      })
      setIsLoading(false);

    })
  }

  function getProductswithquesry() {
    getAllPoducts(searchKey).then(res => {
      console.log(res);
      setProducts(res);
      setIsLoading(false)
    })

  }


  useEffect(() => {
    document.title = 'Mobi Store'
    getCartItems().then(res => {
      setcartProductItems(res.map(r => r.productId));
    })
    getAllPoducts('').then(res => {
      console.log(res);
      setProducts(res);
      setIsLoading(false)
    })
    // return () => {
    //   cleanup
    // }
  }, [])
  console.log(products, "PRODS", isLoading);

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Card style={{ width: '40%' }} item >
            <div className={classes.root}>
              {/* <button type="button" onClick={()=> setOpen(true)}>
                Open menu dropdown
                </button> */}
              <InputBase
                className="card"
                id="searchProduct"
                onFocus={() => setOpen(true)}
                placeholder="Search…"
                value={searchKey}
                onChange={(e) => {setSearchKey(e.target.value);}}
                style={{ width: '100%' }}
                classes={{
                root: classes.searchInput,
                input: classes.inputInput,
              }}
              />
            </div>
        </Card>
        {/* {open ? (
          <div className={classes.searchDropdown} style={{ width: '40%' }}>
            Click me, I will stay visible until you click outside.
            <br></br>
              dfef
              ewfewf
              efew
              fewfew
              fewf
          </div>
        ) : null} */}
      </Grid>
      <PageTitle title="All Products" button={<Button
        variant="contained"
        size="medium"
        color="secondary"
      >
        Latest Phones
    </Button>} />
      { isLoading && <Grid container spacing={4}>
        {[0, 1, 2, 3, 4].map(ele => <Grid item lg={3} md={4} sm={6} xs={12} key={ele}><Skeleton variant="rect" width={310} height={218} /></Grid>)}
      </Grid>
      }
      {!isLoading && <Grid container alignItems="stretch" direction="row" id="productsList"
        spacing={6}>
        {products.filter(product => product.name.toLowerCase().includes(searchKey.toLowerCase())).map(product => <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
          <Link to={'/app/product/view/' + product.id}>
            <Card className={classes.root} style={{ height: '100%' }}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={getImageUrl(product)}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
                    {product.name}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                    $ {product.prize}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Grid container justify="flex-end" alignItems="flex-end" style={{bottom:0}}>
                  {!(cartItems.includes(product.id)) && <Button size="medium" color="primary" onClick={(e) => { e.stopPropagation(); e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); addToCartItem(product.id) }}>
                    Add to cart
                        </Button>}
                  {(cartItems.includes(product.id)) && <Button size="medium" color="secondary"
                    onClick={(e) => { e.stopPropagation(); e.preventDefault(); e.nativeEvent.stopImmediatePropagation(); removeFromCartItem(product.id) }}>
                    Remove
                    </Button>}
                </Grid>

              </CardActions>
            </Card>
          </Link>

        </Grid>)}
      </Grid>}
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
