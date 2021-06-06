
import React, { useEffect, useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";

import useStyles from "./styles";
import { useHistory, useParams } from 'react-router-dom';

import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
    Collapse,
    IconButton,
    Fab,
    Card
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

import CloseIcon from "@material-ui/icons/Close";
import { useUserDispatch } from "../../context/UserContext";

import { getIssueById, updateIssueConv, updateIssueStatus } from "./services/statusService";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
var dateFormat = require("dateformat");

export function VeiwSupportPage(props) {

    var { id } = useParams();
    var role = localStorage.getItem('role');
    var username = localStorage.getItem('name')

    var history = useHistory()
    var dispatch = useUserDispatch()
    var classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [title, setTitle] = useState("");
    var [description, setDescription] = useState("");
    var [status, setStatus] = useState([]);
    var [conversation, setConversion] = useState([]);
    const [open, setOpen] = useState(false);
    const [comment, setComment] = useState("");


    function onAddComment() {
        let conv = {
            username,
            comment,
            date: new Date().toISOString()
        }
        conversation.push(conv)
        setIsLoading(true)
        updateIssueConv(conversation, id).then(re => {
            getIssueById(id).then(re => {
                setTitle(re.title);
                setDescription(re.description);
                let convo = JSON.parse(re.conversation)
                if(Array.isArray(convo)) {
                    setConversion(convo)

                }
                setStatus(re.status)
                console.log(re);
                setIsLoading(false)

            })
        })
    }

    function onStatusChange() {
        updateIssueStatus({ status: 'RESOLVED' },id).then(re => {
            setStatus(re.status);
            getIssueById(id).then(re => {
                setTitle(re.title);
                setDescription(re.description);
                let convo = JSON.parse(re.conversation)
                if(Array.isArray(convo)) {
                    setConversion(convo)

                }
                setStatus(re.status)
                console.log(re);
                setIsLoading(false)

            })
        })

    }



    useEffect(() => {
        getIssueById(id).then(re => {
            setTitle(re.title);
            setDescription(re.description);
            let convo = JSON.parse(re.conversation)
            if(Array.isArray(convo)) {
                setConversion(convo)

            }
            setStatus(re.status)
            console.log(re);
        })
        return () => { }
    }, [])

    return (<><PageTitle title={title} button={<Button
        variant="contained"
        size="medium"
        onClick={() => history.push('/app/dashboard')}
        color="secondary"
    >
        Go to view Phones
        </Button>} />

        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                Your Info has been updated sucessfully
        </Alert>
        </Collapse>
        <Typography variant="h4"><strong>Status: </strong> {status == 'PENDING' ? <span style={{ color: 'red' }}>{status}</span> : <span style={{ color: 'green' }}>{status}</span>}</Typography>
        <br></br>

        <Typography variant="h6"><strong>Description: </strong>{description}</Typography>
        <br></br>
        {conversation.map(conv => <Card style={{padding: '30px', margin: '30px'}}>
                <strong>{conv.username}</strong>
                <br></br>
                <i style={{color: 'gray', fontSize : '10px'}}>{dateFormat(conv.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</i>
                <br></br>
                <br></br>

                <i>{conv.comment}</i>
            <br></br>
        </Card>)}
<br></br>

        <TextField
            value={comment}
            fullWidth
            onChange={((e) => setComment(e.target.value))}
            label="Add Follow up Comments"
            variant="outlined"
            multiline
            rows={5}
            helperText="Please Add your comments"
        ></TextField>
        <br></br>
        <Button onClick={() => {onAddComment();setComment("")}} color="primary" variant="contained" >Add Comment</Button>
        <br></br>

        {role == 'ADMIN' && status == 'PENDING' && <Fab onClick={() => onStatusChange()} color="primary" variant="extended" className={classes.sendButtonIcon} style={{ marginTop: '40px' }}>Mark Resolved <CheckCircleIcon /></Fab>}





    </>)

}