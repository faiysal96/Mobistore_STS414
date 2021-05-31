

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
    Grid,
    LinearProgress,
    Select,
    OutlinedInput,
    MenuItem,
    Button,
    Input,
    TextField,
    IconButton
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab';

import { DropzoneArea } from 'material-ui-dropzone'



import { getProductInfo, addProduct, updateProduct, deleteProduct, addImage, removeImage , updateProductImages} from "../Admin/services/admin.service";
import PageTitle from "../../components/PageTitle";
import { Delete } from "@material-ui/icons";


export default function ProductCreateAndEdit(props) {

    const [products, setProducts] = useState([]);
    let { id } = useParams();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [prize, setPrize] = useState()
    const [stock, setStock] = useState()
    const [images, setImages] = useState([])
    const [intialFiles, setintialFiles] = useState([])
    const [isLoading, setisLoading] = useState(false);
    const [formtouch, setformtouch] = useState(false)

    function addOrUpdateProduct() {
        setformtouch(true)
        setisLoading(true)
        if (id) {
            if (name && description && (prize || prize == 0) && (stock || stock == 0)) {
                updateProduct({ name, description, prize: parseFloat(prize), stock:parseInt(stock) }, id).then(res => {
                    setisLoading(false)

                }).catch(err => {
                    setisLoading(false)
                })
            }

        } else {
            if (name && description && (prize || prize == 0) && (stock || stock == 0)) {

                addProduct({ name, description, prize, stock, images }).then(res => {
                    console.log(res);
                    setisLoading(false)
                })
            }
        }
    }

    async function onImageUpload(e) {
        setisLoading(true);
        let form = new FormData();
        for (let i = 0; i < e.length; i++) {
            form.append('files', e[i])
        }
        if (e.length) {
            addImage(form).then(res => {

                setisLoading(false);
                setImages(images.concat(res));
                updateProductImages(res, id).then(re => {

                })
            }).catch(err => {
                setisLoading(false);

            });
        }
    }

    function onImageRemove(i, image) {
        setisLoading(true);

        if (!id) {
            let imgs = images
            imgs.splice(i, 1)
            setImages(imgs)

        }

        if (id) {
            removeImage([image]).then(res => {
            })
            setisLoading(false);

        }

    }

    function onProductRemove() {
        setisLoading(true)

        if (id) {
            updateProduct({ name, description, prize, stock }).then(res => {
            })
        }
    }
    function mockLoading() {
        if (id) {
            return getProductInfo(id).then(res => {
                console.log(res.name);
                setisLoading(false)
                setName(res.name)
                setDescription(res.description)
                setPrize(res.prize);
                setStock(res.stock);
                setImages(res.images.map(image => image.path))
                console.log(prize, stock, intialFiles);
            })
        }
    }

    useEffect(() => {
        mockLoading()
    }, [])

    return <>
        <PageTitle title="Add Product" />
        <Grid container direction="column" justify="center"
            alignItems="stretch">
            <Grid item direction="column" justify="center"
                alignItems="center" >
                <Grid item container >
                    <TextField fullWidth placeholder="Enter Title" type="text" variant="outlined" label="Title" style={{ width: '100%', margin: '20px' }} error={!name && formtouch} onChange={(e) => setName(e.target.value)} value={name}></TextField>
                </Grid>
                <Grid item container >
                    <TextField fullWidth placeholder="Enter Description" type="text" variant="outlined" label="Description" style={{ width: '100%', margin: '20px' }} value={description} multiline error={!description && formtouch} rows={4} onChange={(e) => setDescription(e.target.value)}></TextField>
                </Grid>
                <Grid item container >
                    <TextField fullWidth placeholder="Enter price" InputLabelProps={{
                        shrink: true,
                    }} type="number" variant="outlined" label="Price" style={{ width: '100%', margin: '20px' }} value={prize} error={!!!prize && prize != 0 && formtouch} onChange={(e) => setPrize(parseInt(e.target.value))}></TextField>
                </Grid>

                <Grid item container >
                    <TextField fullWidth placeholder="Enter stock" InputLabelProps={{
                        shrink: true,
                    }} type="number" variant="outlined" label="Stock" style={{ width: '100%', margin: '20px' }} value={stock} error={!stock && stock != 0 && formtouch} onChange={(e) => setStock(parseInt(e.target.value))}></TextField>
                </Grid>
            </Grid>

            <Grid item container style={{ width: '90%' }} justify="center"
                alignItems="center">
                <label style={{ margin: '0 30px' }}>Upload Images:</label>
                <input type="file" multiple accept="image/*" onChange={(e) => { onImageUpload(e.target.files); e.target.value = null; }} />

                <Grid container direction="row">
                    {images.map((image, i) => <Grid style={{ margin: '10px' }}>
                        <img src={'http://localhost:5000/' + image} style={{ maxHeight: '170px', maxWidth: '170px' }} />
                        <br></br>
                        <IconButton onClick={() => onImageRemove(i, image)}><Delete color="secondary" /></IconButton>
                    </Grid>)}
                </Grid>

            </Grid>
        </Grid>
        <Grid container spacing={3} justify="center" alignItems="center">
            {!isLoading && <Button variant="contained"
                size="large"
                style={{ margin: '50px' }}
                onClick={addOrUpdateProduct}
                color="secondary">{id ? 'update' : 'Add'}</Button>}

            {isLoading && <Skeleton variant="rect" width={130} height={48} />}
        </Grid>
    </>
}
