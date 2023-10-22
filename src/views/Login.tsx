import { TextField,Button, Box, Link, Typography } from "@mui/material";
import TopBar from "../TopBar";

function Login(props : any) 
{
	let config = props.config;
	let pass : string = "";
	return(
    <Box>
        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                justifyContents:"center",
                alignItems:"center"
            }}
        >
            <Typography variant="h5">good luck remembering your account</Typography>
            <TextField 
                onChange={e => {props.emailChangeHandler(e.target.value)}}
                label="Email"
                sx={{maxWidth:'50vw'}}
            />
            <TextField 
                onChange={e => {pass=e.target.value;}} 
                label="Password"
                sx={{maxWidth:'50vw'}}
            />
            <Button onClick={e => props.getSession(e, props.userEmail, pass, config)} sx={{maxWidth:"40vw"}}>
                Log In
            </Button>
            <Link onClick={()=>props.viewSetter('register')}>Or Register A New Account</Link>
        </Box>    
        
    </Box>
    );
}

export default Login