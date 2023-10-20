import { TextField,Button, Box } from "@mui/material";
import TopBar from "./TopBar";

function Login(props : any) 
{
	let config = props.config;
	let pass : string = "";
	return(
    <Box>
        <TopBar logged={false} userEmail={props.email}></TopBar>
        <TextField onChange={e => {props.emailChangeHandler(e.target.value)}} label="Email"/>
		<TextField onChange={e => {pass=e.target.value;}} label="Pass"/>
		<Button onClick={e => props.getSession(e, props.userEmail, pass, config)}>Sign in (or create a new account and sign it with it :-)</Button>
    </Box>
    );
}

export default Login