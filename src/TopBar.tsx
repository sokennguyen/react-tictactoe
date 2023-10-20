import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"

const TopBar = ({logged,userEmail}: {logged:boolean,userEmail:string}) => (
    <Box sx={{flexGrow:1}} mb={2}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow:1}}>
                    TicTacToe
                </Typography>
                {logged 
                    ? <>
                        {userEmail}
                        <Typography variant="h6" sx={{flexGrow:1}}>
                            (logged in as "{userEmail}")
                        </Typography>
                        <Button color="inherit">Logout</Button>
                    </> 
                    : <Typography>
                        Not Logged In
                    </Typography> }
            </Toolbar>
        </AppBar>
    </Box>
)
export default TopBar