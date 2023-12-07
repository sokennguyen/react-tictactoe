import { useEffect, useState } from "react";

const Lobby = (props:any) => {
    let [count,setCount] = useState(0);
    let [players,setPlayers] = useState([])
    const c = props.config
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('hihi');
            setCount(count + 1);
            fetch(c.serviceroot+c.receive, { method : "GET", mode : "cors", credentials : "include", 
                                            headers: {'Content-Type': 'text/plain'}}).
	        then( r => r.json() ).then( j => setPlayers(j.names) ).catch( e => console.log(e));
        }, 1000);
 
        return () => clearInterval(interval);
    }, [count]);    

    return (
        <>
            {players.map(player=>
                <p key={player}>
                    {player}
                </p>
            )}
        </>
    )
}

export default Lobby;