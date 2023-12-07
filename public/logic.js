"use strict";
const connection = new ServerConnection();

const state = [[],[],[]]

const EMPTYT = String.fromCharCode(160)+" "+String.fromCharCode(160)+" "+String.fromCharCode(160);
const X_TEXT = String.fromCharCode(160)+"X"+String.fromCharCode(160);
const O_TEXT = String.fromCharCode(160)+"O"+String.fromCharCode(160);

let participant = false;

let timeout;

//You can't click twice in a row, you have to wait for a response from the other player.
let alreadyClicked = false;

function start()
{
	let text = "TicTacToeGame";
	let troot = document.getElementById("maintable");
	let newtable = document.createElement("table");
	let newtr = document.createElement("tr");
	newtable.border = 1;
	for (let i = 0 ; i < text.length; i++ )
	{
		let cell = document.createElement("td");
		cell.onclick = () => click(111, i);
		let character = document.createTextNode(String.fromCharCode(160)+
							text.substring(i, i+1)+
							String.fromCharCode(160)
						);
		cell.appendChild(character);
		newtr.appendChild(cell);
		if (i === 5)
		{
			newtable.appendChild(newtr);
			newtr = document.createElement("tr");
		}
	}
	newtable.appendChild(newtr);
	troot.appendChild(newtable);
	
	timeout = setTimeout(timercode, 5000);
}

function timercode()
{
	//fetchState() also created a new Retrieve instance, which is inherited from Update, which calls the callback! So we don't
	//even need to calls updateTable here!!!!
	connection.fetchState();
	//recursive function? (o_O)
	timeout = setTimeout(timercode, 100);
}
function callback() {
	let statestring = connection.fetchState()
	if (statestring != 'NONEWS')
	{
		if (statestring.substring(0,1) != "B") alreadyClicked = false
		else statestring = statestring.substring(1)
		updateTable(statestring.substring(1))
	}
}

function drawx()
{
	return document.createTextNode(X_TEXT);
}
function drawo()
{
	return document.createTextNode(O_TEXT);
}
function drawe()
{
	return document.createTextNode(EMPTYT);
}

//player1 get instant refresh when clicked, whereas player2 still relies on timer for such update
function updateTable(statestring)
{
	let troot = document.getElementById("maintable")
	let newtable = document.createElement("table")
	let newtr = document.createElement("tr")
	let count = 0
	let blankCount = 0
	troot.innerHTML=''
	let curid = connection.currentIdentity()
	let idInfo = document.createElement('p')
	let previousMove = connection.previousMoveBy()
	let currentTurn = previousMove === 'X' ? 'O' : 'X'

	if (alreadyClicked) 
	//info text not behaving well with third browser
		idInfo.textContent = curid==='X' ? 'wait for O\'s turn' : 'wait for X\'s turn'
	else 
		idInfo.textContent = `Click to place a move as ${currentTurn}`
	troot.appendChild(idInfo)

	newtable.border = 1
	for (let i = 0 ; i < 3; i++ ){
		for (let j = 0; j < 3; j++){
			let cell = document.createElement("td")
			cell.onclick = () => click(i, j)

			let charInBox
			switch (statestring[count]){
				case('_'):{
					charInBox=drawe();
					blankCount++
				} 
				break;
				case('X'): charInBox=drawx();
				break;
				case('O'): charInBox=drawo();
				break;
			}
			
			state[i][j]=charInBox.nodeValue
			cell.appendChild(charInBox)
			newtr.appendChild(cell)
			if (j === 2)
			{
				newtable.appendChild(newtr)
				newtr = document.createElement("tr")
			}
			count++
		}
	}
	if (blankCount===0) connection.restartSession()
	newtable.appendChild(newtr)
	troot.appendChild(newtable)
	const resetButton = document.createElement('button')
	resetButton.onclick=()=>{
		connection.restartSession()
		updateTable(statestring)
	}
	resetButton.textContent='Restart'
	troot.appendChild(resetButton)
	count=0
	
}
function resolveIdAndUpdate(x,y)
{
	if (x === 111) 
	{
		callback()
		return "";
	}

	if (alreadyClicked) {
		alert('You\'re trying make 2 moves in 1 turn, not fair (-_-)')
		return ''
	}
	if (state[x][y]!==EMPTYT) {
		alert('The square is already played :D?!')
		return ""
	}
	
	let curid = connection.currentIdentity();
	if (curid === "")
	{
		curid = connection.previousMoveBy();
		if (curid === "X") 
		{
			state[x][y] = O_TEXT;
			curid = "O";
		}
		else 
		{
			state[x][y] = X_TEXT;
			curid = "X";
		}
			
	}
	else
	{
		if (curid === connection.previousMoveBy())
		{
			alert("Somehow it seems to me you are trying to use a THIRD browser to get more turns!?");
			return "";
		}
		else
		{
			if (curid === "X") state[x][y] = X_TEXT;
			else state[x][y] = O_TEXT;
		}
	}
	participant = true;
	return curid;
}

function click(x,y)
{
	let curid = resolveIdAndUpdate(x,y);
	if (curid === "") return;
	let statestring = curid;
	for (let i = 0 ; i < 3; i++ )
	{
		for (let j = 0; j < 3; j++ )
		{
			switch (state[i][j])
			{
				case (X_TEXT): {statestring += "X";} break;
				case (O_TEXT): {statestring += "O";} break;
				case (EMPTYT): {statestring += "_";} break;
				default: alert("There's stuff in state that should not be there!?"); return;
			}
		}
	}
	connection.updateState(statestring);
	alreadyClicked = true;
}
const checkForWin = () => {
	for (let i = 0; i<3; i++){

		//horizontal
		if ((state[i][0] !== EMPTYT) &&
			(state[i][0] === state[i][1]) &&
			(state[i][0] === state[i][2]))
			return (state[i][0] == X_TEXT ? 1 : -1) 

	}
}