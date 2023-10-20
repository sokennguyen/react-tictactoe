import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { CircularProgress } from '@mui/material';
import TicTacToe from './TicTacToe';

/*
	This file is the "starter motor": It places a rolling "please wait" circle on the screen, requests the
	settings from the server and once the settings have arrived starts the actual application.
	See how to implement the "please wait" indicator. This is one of the many ways to do it. It is a practical
	requirement to a lot of apps.
	...unfortunately, in the case of this app the circle will probably not be visible for more than an eyeblink
	(if that...) you can naturally try it by commenting out the fetch :-).
*/

let config : any;

function showError(e : any)
{
	brancher("error"); 
	console.log(e);
}

function configureApp(c : any)
{
	config = c;
	brancher("tictactoe");
}


function App() {
	if (config == null)
	{
		config = {};
		fetch("/config.json", { method : "GET", mode : "cors", credentials : "include" }).
			then( r => r.json() ).then( j => configureApp(j) ).catch( e => showError(e));
	}
	return (<Spinner state="init"/>);
}


let brancher : Dispatch<SetStateAction<any>>;

function Spinner( props : any )
{
	let [ branch, setBranch ] = React.useState(props.state);
	brancher = setBranch;
	let ret : JSX.Element;
	switch (branch)
	{
		case "init": ret = <CircularProgress key="spin" />; break;
		case "tictactoe": ret = <TicTacToe key="done" config={config} view="login"/>; break;
		default: ret = <div key="err">We didn't get a config, check the logs...</div>;
	}
	return ret;
}



export default App;
