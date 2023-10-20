import { TextField,Button, Box, Link, Typography } from "@mui/material";
import TopBar from "../TopBar";

function Register(props : any) 
{
	let config = props.config;
	let pass : string = "";
	return(
    <Box>
        <TopBar logged={false} userEmail={props.email} config={props.config} viewSetter={props.viewSetter}></TopBar>
        <Box
            sx={{
                display:"flex",
                flexDirection:"column",
                justifyContents:"center",
                alignItems:"center"
            }}
        >                
            <Typography variant="h4">Register</Typography>
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
            <Button onClick={e => props.register(e, props.userEmail, pass, config)} sx={{maxWidth:"40vw"}}>
                   Create Account
            </Button>
            <Box sx={{display:'flex',alignItems:'center',gap:'5px'}}>
                <Typography fontSize={15}>Have an account? </Typography>
                <Link onClick={()=>props.viewSetter('login')}>Log in instead</Link>
            </Box>
        </Box>    
        
    </Box>
    );
}

export default Register