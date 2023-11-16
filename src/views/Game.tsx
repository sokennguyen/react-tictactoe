import { Checkbox, Box } from '@mui/material';
import { useRef, useEffect, useState } from 'react';

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
    if (x>y) return (largerLength/x)*y
    if (y>x) return largerLength-largerLength/x
    return largerLength
}

function Game(props : any) {
    let [gameState, setGameState]= useState(new Array(props.sizey));
    for (let i=0; i<gameState.length; i++)
        gameState[i]=new Array(props.sizex).fill(0);
    const canvas = useRef();
    let sizey:number, sizex:number;
    useEffect(() => {
            if (canvas.current){
            const ctx = (canvas.current as any).getContext('2d');
            requestAnimationFrame(()=>drawGameBoard(ctx,
                        props.sizey,
                        props.sizex,
                        sizey,
                        sizex));
            (canvas.current as any).onclick = (e:any) => HandleCanvasClick(e,
                    props.sizex,
                    props.sizey,
                    canvas,
                    gameState)
            } else alert('error creating canvas')
            })
    //The problem here is that our computer screens are not squares.
    //Therefore square gameboards cannot work with full width.
    //Gameboards are now scrollable if its height exceeds the screen.
    //Uncommon line counts will result in weird gameboards.
    function drawGameBoard(canvas:CanvasRenderingContext2D, 
            ycount: number,
            xcount: number,
            sizey: number,
            sizex: number
            ){
        //redraw screen
        canvas.fillStyle='white';
        canvas.beginPath();
        canvas.fillRect(0,0,canvas.canvas.width,canvas.canvas.height);
        canvas.stroke();
        canvas.fillStyle='black';
        //draw lines on board
        const strokeWidth = 1
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
            canvas.closePath();
            canvas.stroke();
            currentPx = (x+2)*strokeWidth+(x+1)*xBoxSize;
        }
        //draw parts of existing X
        for (let i=0; i<gameState.length; i++)
            for (let j=0; j<gameState[0].length; j++)
            {
                const x = i*xBoxSize+xBoxSize/2;
                const y = j*yBoxSize+yBoxSize/2;
                const startX = x+xBoxSize/2;
                const startY = y-yBoxSize/2;
                console.log(x,y);
                canvas.beginPath();
                canvas.moveTo(startX,startY);
                canvas.lineTo(startX-gameState[i][j],startY+gameState[i][j]);
                canvas.closePath();
                canvas.stroke();
                canvas.beginPath();
                canvas.moveTo(startX-xBoxSize,startY);
                canvas.lineTo(startX-xBoxSize+gameState[i][j],startY+gameState[i][j]);
                canvas.closePath();
                canvas.stroke();
            }
    }
    const DrawPartX = (i:number,j:number,radius:number,progress:number, canvas:any, sizey:number, sizex:number, ycount:number, xcount:number) => {
        
    }
    const DrawX = (i:number,j:number,gameState:any) => {
        if (gameState[i][j]<100) {
            gameState[i][j]++;
            console.log(gameState[i][j])
            const ctx = (canvas.current as any).getContext('2d');
            drawGameBoard(ctx,
                        props.sizey,
                        props.sizex,
                        sizey,
                        sizex);
            requestAnimationFrame(()=>DrawX(i,j,gameState))
        }
    }
    const HandleCanvasClick = (event:any,
            xcount:number,
            ycount:number,
            canvas:any,
            gameState:any) => {
        const canvasBound = canvas.current.getBoundingClientRect();
        const clickx = event.clientX - canvasBound.left;
        const clicky = event.clientY - canvasBound.top;
        //will cause trouble if strokeWidth is large
        const x = Math.floor(clickx/(canvas.current.width/xcount));
            const y = Math.floor(clicky/(canvas.current.height/ycount));
            console.log(canvas.current.width+' '+xcount);
            console.log(canvas.current.height+' '+ycount);
            console.log(x+':'+y);
            DrawX(x,y,gameState);
    }
    const topBar:HTMLElement = document.querySelector('.css-11wuilo')!
        const root:HTMLElement = document.querySelector('#root')!
        if (props.sizex>props.sizey) {
            sizey=calcBoardShorterLength(
                    root.offsetWidth,
                    props.sizex,
                    props.sizey
                    );
            sizex=root.offsetWidth;
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
                    root.offsetWidth,
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
