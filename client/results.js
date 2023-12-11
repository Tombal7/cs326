import {favs} from "./favorites.js";
import { calcOldProj } from "./stats.js";

export class Result{
    constructor(){
        let arr = favs.getFavorites();
        console.log(arr);
        let l = arr.length;
        let i = Math.floor(Math.random()*l);
        this.result = arr[i];
    }   
    getRandomResult(){
        return this.result;
    }
    renderLeft(element){
        //element.innerHTML += '<div class="middle">';//change to picture of player, name, projection, view more
        element.innerHTML ='';
        
        

        let date = this.result.lastGame.date;
        let pts = this.result.lastGame.pts;
        let opp = this.result.lastGame.opp;
        let oldProj = calcOldProj(this.result);
        let dif = oldProj - pts;   

        const tx = document.createElement('div')
        tx.innerHTML = `<h2 class = "leftHead" >Result  ${date}</h2>`;
       
        element.appendChild(tx);
        const div = document.createElement('div');
        
        div.innerHTML += `<img src = ${this.result.image} class = 'leftPic'></img>`;
        
        div.innerHTML += `<h2 class = "leftName">${this.result.name}</h2>`;
        div.innerHTML += `<h3 class = "leftOpp">vs. ${opp}</h3>`;
        div.innerHTML += `<h2 class = "leftProj">Projection:  ${oldProj}</h3>`;
        if(dif>0){
            div.innerHTML += `<h2 class = "leftPts">Points:  ${pts}</h2>`;
            div.innerHTML += `<h2 class = "leftDiffB">Difference:  -${Math.abs(dif)}</h2>`;
        } else {
            div.innerHTML += `<h2 class = "leftPts">Points:  ${pts}</h2>`;
            div.innerHTML += `<h2 class = "leftDiffG">Difference:  +${Math.abs(dif)}</h2>`;
        }
        element.appendChild(div);
    }

    renderMiddle(element){
        //if(element === middleElement){}
        //element.innerHTML += '<div class="middle">';//change to picture of player, name, projection, view more
       
        element.innerHTML ='';
        const tx = document.createElement('div');
        tx.innerHTML = `<h2 class = "middleHeadRes" >Results</h2>`;
       
        element.appendChild(tx);
        let favArr = favs.getRandomThree();
        console.log("Random 3", favArr);
        for(let i=0; i<3; i++){
            const div = document.createElement('div');
            console.log(favArr[i]);
            div.className = 'middleRes';
            div.innerHTML += `<img src = ${favArr[i].image} class = 'MidPlayerPic'></img>`;
            console.log(favArr[i]);
            let proj = calcOldProj(favArr[i]);
            let last = favArr[i].lastGame;
            if(favArr[1].name == "Giannis Antetokounmpo"){
                div.innerHTML += `<h2 class = 'midPlayerNameGiannis'>${favArr[i].name}  </h2>`;
            } else{
                div.innerHTML += `<h2 class = 'midPlayerName'>${favArr[i].name}  </h2>`;
            }
            div.innerHTML += `<h2 class = 'midPlayerOpp'> ${last.date} vs. ${last.opp}</h2>`;
            div.innerHTML += `<h2 class = 'midPlayerProj'>Projection: ${proj}</h2>`;
            div.innerHTML += `<h2 class = 'midPlayerPts'>Points: ${last.pts}</h2>`;
            let dif = proj - last.pts;
            if(dif>0){
                div.innerHTML += `<h2 class = "midDiffB">Difference:  -${Math.abs(dif)}</h2>`;
            } else {
                div.innerHTML += `<h2 class = "midDiffG">Difference:  +${Math.abs(dif)}</h2>`;
            }
            
            /*
            let buttonID = 'viewMore' + favArr[i].name;
            console.log("BUTTON ID",buttonID);
            div.innerHTML += `<input type = "button" class = "midPlayerViewMore" value = "View More" id = ${buttonID}/></div>`;
            */
            
            element.appendChild(div);
        }
    }
        //element.innerHTML += '</ul>';
        //element.innerHTML += '</div>';
    }


let result = new Result();
export { result };