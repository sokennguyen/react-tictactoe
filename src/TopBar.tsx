import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

const TopBar = ({logged,userEmail,config,viewSetter}: {logged:boolean,userEmail:string,config:any,viewSetter:Function}) => {
    const Logout = (config:any) => {
        console.log(config.logout);
        
        fetch(config.serviceroot+config.logout,{method : "GET", mode : "cors"})
        viewSetter('login')
    }
    return (
        <Box sx={{flexGrow:1}} mb={2}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h3" sx={{flexGrow:1}}>
                        TicTacToe
                    </Typography>
                    {logged 
                        ? <>
                            <Typography variant="h6" ml={3} mr={3} sx={{flexGrow:0}}>
                                Logged In As "{userEmail}"
                            </Typography>
                            <Button color="inherit" variant="outlined" onClick={()=>Logout(config)}>Logout</Button>
                        </> 
                        : <Typography>
                            Not Logged In
                        </Typography> }
                </Toolbar>
            </AppBar>
        </Box>
    )
} 
export default TopBar