
import React, { useEffect, useState } from 'react'
import PageTitle from "../../components/PageTitle/PageTitle";

import useStyles from "./styles";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom'

import {
    Grid,
    CircularProgress,
    Typography,
    Divider,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
    Collapse,
    IconButton,
    Card
} from "@material-ui/core";

import {
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Chip
} from "@material-ui/core";

import Alert from '@material-ui/lab/Alert';

import CloseIcon from "@material-ui/icons/Close";
import { useUserDispatch } from "../../context/UserContext";

import { getMyIssues, addIssue, getAll } from "./services/statusService";




export function AdminSupportPage(props) {

    var history = useHistory()
    var dispatch = useUserDispatch()
    var classes = useStyles();
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [title, setTitle] = useState("");
    var [description, setDescription] = useState("");
    var [myIssues, setMyIssues] = useState([]);
    var [phone, setPhoneValue] = useState("");
    const [open, setOpen] = useState(false);

    function addIssueC() {
        setIsLoading(true);
        addIssue({ title, description }).then(res => {
            setIsLoading(false);
            setOpen(true);
            setTitle('')
            setDescription('');
            getMyIssuesFromService()

        }).finally(() => {
            setIsLoading(false);
        })

    }

    function getMyIssuesFromService() {

        getAll().then(res => {
            setMyIssues(res)
        }).finally(() => {

        })

    }



    useEffect(() => {
        getMyIssuesFromService()

        return () => { }
    }, [])

    return (<><PageTitle title="How Can we Help you today?" button={<Button
        variant="contained"
        size="medium"
        onClick={() => history.push('/app/dashboard')}
        color="secondary"
    >
        Go to Phones
        </Button>} />
        <Collapse in={open}>
            <Alert
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="medium"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                Your issue has been recorded !! Soon Our Executive will Contact you.
        </Alert>
        </Collapse>

        <Grid container justify="center" style={{width: '90%'}}>
            <Typography variant="h4" className="mt-4">My Previous Issues</Typography>
        </Grid>
        <br></br>
        <Grid container spacing={4} direction="column" justify="center" alignItems="center" style={{ width: '80%' }}>
            <Card style={{ width: '90%' }}>
                <Table className="mb-0">
                    <TableHead>
                        <TableRow>
                            {['Sl No.', 'Title', 'Status', 'Last Updated ', 'Raised By'].map(key => (
                                <TableCell key={key}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myIssues.map(({ id, title, status, updatedAt, user }, i) => (
                            <TableRow key={i}>
                                <TableCell className="pl-3 fw-normal">{i + 1}</TableCell>
                                <TableCell className="pl-3 fw-normal"><Link to={"/app/support-view/" + id}>{title}
                                    </Link></TableCell>
                                <TableCell>
                                    <Chip label={status} color={status == 'PENDING' ? 'secondary': 'primary'} />
                                </TableCell>
                                <TableCell>{updatedAt}</TableCell>
                                <TableCell>{user.firstName + ' ' + user.lastName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </Grid>
        <Grid>
            
        </Grid>




    </>)

}