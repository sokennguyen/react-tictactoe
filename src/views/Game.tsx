import { Checkbox, Box } from '@mui/material';
import { useRef, useEffect } from 'react';

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
function calcBoardShorterLength(largerLength:number, x:number, y:number){
    if (x>y) return largerLength-largerLength/y
    if (y>x) return largerLength-largerLength/x
    return largerLength
}
function drawGameBoard(canvas:CanvasRenderingContext2D, 
                        ycount: number,
                        xcount: number,
                        sizey: number,
                        sizex: number
                    ){
    console.log(sizey)
    const strokeWidth = 5
    canvas.lineWidth = strokeWidth;
    let yBoxSize = (sizey - strokeWidth*(ycount+1))/ycount
    let xBoxSize = (sizex - strokeWidth*(xcount+1))/xcount
    let currentPx = strokeWidth+yBoxSize;
    for (let y = 1; y < ycount ; y++){
        canvas.beginPath();
        canvas.moveTo(0,currentPx);
        canvas.lineTo(sizex,currentPx);
        canvas.closePath()
        canvas.stroke()
        currentPx = (y+2)*strokeWidth+(y+1)*yBoxSize;
    }
    currentPx = strokeWidth+xBoxSize;
    for (let x = 1; x < xcount ; x++){
        canvas.beginPath();
        canvas.moveTo(currentPx,0);
        canvas.lineTo(currentPx,sizey);
        canvas.closePath()
        canvas.stroke()
        currentPx = (x+2)*strokeWidth+(x+1)*xBoxSize;
    }
}

function Game(props : any) {
    const canvas = useRef();
    let sizey:number, sizex:number;
    useEffect(() => {
        if (canvas.current){
            const ctx = (canvas.current as any).getContext('2d');
            drawGameBoard(
                ctx,
                props.sizey,
                props.sizex,
                sizey,
                sizex
            )
        } else alert('error creating canvas')
    })
    if (props.sizex>props.sizey) {
        sizey=calcBoardShorterLength(
                            window.innerWidth,
                            props.sizex,
                            props.sizey
                        );
        sizex=window.innerWidth;
        return(
            <Box>
                <canvas id='test'
                        width={sizex} 
                        height={sizey}
                        ref={canvas as any}/>
            </Box>
        )
    }
    else {
        sizex=calcBoardShorterLength(
                            window.innerWidth,
                            props.sizex,
                            props.sizey
                        );
        sizey=window.innerWidth;
        return(
            <Box>
                <canvas id='test'
                        height={sizey}
                        width={sizex}
                        ref={canvas as any}/>

            </Box>
        )
    }
}

export default Game;
