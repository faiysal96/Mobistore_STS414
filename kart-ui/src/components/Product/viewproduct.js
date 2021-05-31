

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
    Typography,
    Card,
    Button,
    Input,
    TextField,
    Box,
    IconButton
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';

import { getProductInfo, addProduct, updateProduct, deleteProduct, addImage, removeImage } from "../Admin/services/admin.service";
import PageTitle from "../../components/PageTitle";
import "react-image-gallery/styles/css/image-gallery.css";

import ImageGallery from 'react-image-gallery';

import { addToCart as addToCartApi, getProductCartInfo, updateCartQunatityApi } from './service/cart'

// import MyReactImageMagnify from './image-maginify'
import { useHistory } from 'react-router-dom';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

import RemoveCircleOutlineOutlinedIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';

import AddIcon from '@material-ui/icons/Add';

import RemoveIcon from '@material-ui/icons/Remove';

export default function ViewProduct(props) {

    const [addedToCart, setIsAddedToCart] = useState(false);
    const [isWishListed, setIsWishListed] = useState(false);
    const [cartId, setcartId] = useState();
    const [cartQuantity, setCartQuantity] = useState();

    const history = useHistory()



    let { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [prize, setPrize] = useState()
    const [stock, setStock] = useState()
    const [images, setImages] = useState([])

    const [isLoading, setisLoading] = useState(false);

    function addToCart() {
        addToCartApi({ quantity: 1, product: parseInt(id) }).then(res => {
            setCartQuantity(1)
            setcartId(res.id)
        })
    }

    function updateQuantity(type) {
        setisLoading(true)
        updateCartQunatityApi(cartId, { quantity: type == 'ADD' ? cartQuantity + 1 : cartQuantity - 1 }).then(res => {
            setCartQuantity(res.quantity)
            setcartId(res.id)
            setisLoading(false)

        })
    }

    useEffect(() => {
        if (id) {
            getProductInfo(id).then(res => {
                setisLoading(false)
                setName(res.name)
                setDescription(res.description)
                setPrize(res.prize);
                setStock(res.stock);
                setImages(res.images.map(image => {
                    return {
                        thumbnail: `http://localhost:5000/${image.path}`,
                        original: `http://localhost:5000/${image.path}`
                    }
                }
                ))
            })
            getProductCartInfo(id).then(re => {
                if (re) {
                    setCartQuantity(re.quantity);
                    setcartId(re.id)
                }
            })
        }
        return () => { }
    }, [])

    return <>
        <PageTitle title={name} />
        <Card>

            <Grid container spacing={2} justify="space-around"
                alignItems="center"
            >
                <Grid item>
                    <ImageGallery items={images} showPlayButton={false} />

                </Grid>
                <Grid item >
                    <Typography variant="h6">{name}</Typography>
                    <br></br>
                    <Typography variant="subtitle2">{description}</Typography>
                    <br></br>
                    <br></br>
                    <Typography variant="h4">$ {prize}</Typography>
                    <br></br>
                    {!cartId && <Button variant="contained"
                        size="large"
                        onClick={() => addToCart()}
                        style={{ margin: '50px' }}
                        color="secondary">Add to Cart</Button>}

                    {cartId && <Box >
                        <IconButton onClick={() => updateQuantity('REMOVE')}>
                            <RemoveCircleOutlineOutlinedIcon />
                        </IconButton>
                        <span style={{ margin: '0 10px' }} variant="h6">
                            <strong>
                                {cartQuantity}
                            </strong>
                        </span>
                        <IconButton onClick={() => updateQuantity('ADD')}>
                            <AddCircleOutlineOutlinedIcon /></IconButton>
                        <br></br>
                        <br></br>
                        <Button
                            variant="contained"
                            size="medium"
                            color="secondary"
                            onClick={() => history.push('/app/checkout')}
                        >
                            Check Out
                                </Button>

                    </Box>}

                </Grid>

                {/* https://codesandbox.io/s/xenodochial-rosalind-g9ve4?file=/src/MyImageGallery.js */}
            </Grid>
            {/* <Grid container spacing={3} justify="center" alignItems="center">
            {!isLoading && <Button variant="contained"
                size="large"
                style={{ margin: '50px' }}
                color="secondary">{id ? 'update' : 'Add'}</Button>}

            {isLoading && <Skeleton variant="rect" width={130} height={48} />}
        </Grid> */}
        </Card>

    </>
}
