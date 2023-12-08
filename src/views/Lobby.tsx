import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const Lobby = (props:any) => {
    let [players,setPlayers] = useState([])
    const c = props.config
    useEffect(() => {
        const interval = setInterval(() => {
            fetch(c.serviceroot+c.receive, { method : "GET", mode : "cors", credentials : "include", 
                                            headers: {'Content-Type': 'text/plain'}}).
	        then( r => r.json() ).then( j => {
                                                setPlayers(j.names) 
                                                if (j.ingame=='true') props.viewSetter('game');
                                            }).catch( e => console.log(e));
        }, 1000);

        
        return () => {
            clearInterval(interval);
        }
    }, [players]);    

    const HandleButtonClick = (player:any) => {
        props.viewSetter('game')
        const assignedPlayers = {
            "x":props.userEmail,
            "o":player
        }
        fetch(c.serviceroot+c.assign, { method : "POST", mode : "cors", credentials : "include", 
												headers: {'Content-Type': 'text/plain'}, 
												body : JSON.stringify(assignedPlayers) }).
        then( r => r.json() )
    }
    return (
        <>
            {players.map(player=>{
                if (player!=props.userEmail) return (
                    <p key={player} >
                        <Button onClick={()=>HandleButtonClick(player)}>
                            {player}
                        </Button> 
                    </p>
                )
            })}
        </>
    )
}

export default Lobby;