import React from 'react';
import { Checkbox, Box } from '@mui/material';
import TopBar from '../TopBar';

function showError(e : any)
{
	alert("So, then... you got this error. Kind of weird you got this far and still see this, but let's see what we're going to do about it next week. In the meanwhile, open up the network logs and see what they say, because at the moment your teacher wants to know too :-D.");
}

function handleMove(j : any)
{
	alert("We'll handle the moves next week, just finalize the sign-in and top status bar first :-). This component has been created already this week mainly to allow you to see a change occur after signing in and also as a hands-on-example of separating the app into components. Once we finish working on this thing you actually enter the game via the \"Lobby\".");
}

function sendMove(mx: number, my: number, c: any)
{
	let obj = { x : mx, y : my};
	fetch(c.serviceroot+c.receiver, { method : "POST", mode : "cors", credentials : "include", 
							headers: {'Content-Type': 'text/plain'}, 
							body : JSON.stringify(obj) }).
							then( r => r.json() ).then( j => handleMove(j) ).catch( e => showError(e));
}

function Game(props : any) {
  let rows = [];
  let config = props.config;
  for (let y = 0; y < props.sizey; y++)
  {
    let cols = [];
    for (let x = 0; x < props.sizex; x++)
    {
	cols.push(<td key={"cell"+x+y}><Checkbox onClick={() => sendMove(x,y,config)}/></td>);
    }
    rows.push(<tr key={"row"+y}>{cols}</tr>);
  }
  return(
  <Box>
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  </Box>
  )
}

export default Game;
