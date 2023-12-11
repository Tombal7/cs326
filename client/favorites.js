import * as stats from './stats.js';
import { playerList } from "./playerList.js";

await playerList.loadPlayers();

export class Favorites{
    //Players view and functions relating to favorites in local storage
    constructor(){
        this.fav = [];
        //default three favorites
        this.fav.push(playerList.players.find(p => p.name === 'Jayson Tatum'));
        this.fav.push(playerList.players.find(p => p.name === 'Stephen Curry'));
        this.fav.push(playerList.players.find(p => p.name === 'Kevin Durant'));
        this.adds = 0;
        //if localstorage update on that favorites
        if(window.localStorage.getItem('favArr') && JSON.parse(window.localStorage.getItem('favArr')).length>=3){
            this.fav = JSON.parse(window.localStorage.getItem('favArr'));
        }
    }

    clearFavorites(){
        this.fav = [];
        //back to default and remove from local storage
        this.fav.push(playerList.players.find(p => p.name === 'Jayson Tatum'));
        this.fav.push(playerList.players.find(p => p.name === 'Stephen Curry'));
        this.fav.push(playerList.players.find(p => p.name === 'Kevin Durant'));
        if(window.localStorage.getItem('favArr')){
            window.localStorage.removeItem('favArr');
        }
    }

    addFavorite(playerName,element){//add favorite text input 
        //add to localstorage

        //if elses deal with the fact there is a default list of favorites separate from local storage so that the deafaults can be added to favorites even though they are already there as defaults in this.fav
        this.adds++;
        element.innerHTML = '';
        let newF = playerList.players.find(p => p.name === playerName);
        let temp = JSON.parse(window.localStorage.getItem('favArr'));
        if(!newF){
            element.innerHTML += '<p>Player not found!</p>';
        } else if(this.fav.some(f => f.name === newF.name)&& temp){
            
            if(this.adds<3 && temp.every(f => f.name !== newF.name)){
                temp.push(newF);
                window.localStorage.setItem('favArr', JSON.stringify(temp));
                element.innerHTML += `<p>${playerName} added to favorites!</p>`;
            } else{
                element.innerHTML += '<p>Player already in favorites!</p>';
            }
        } else if(temp && temp.some(f => f.name === newF.name)){
            element.innerHTML += '<p>Player already in favorites!</p>';
        }
        else{
            let fArr = JSON.parse(window.localStorage.getItem('favArr'));
            if(fArr){
                fArr.push(newF);
                window.localStorage.setItem('favArr', JSON.stringify(fArr));
                
            }else{
                fArr = [newF];
                window.localStorage.setItem('favArr', JSON.stringify(fArr));
                
            }
            if(fArr.length>=3){
                this.fav = fArr;
                
            }
           
            element.innerHTML += `<p>${playerName} added to favorites!</p>`;
        }
    }
    getFavorites(){
        let temp = JSON.parse(window.localStorage.getItem('favArr'));
        if(temp && temp.length>=3){
            this.fav = temp; //back up check to make sure this.fav is updated for other file renders
        }
        return this.fav;
    }
    getRandomThree(){
        let temp = JSON.parse(window.localStorage.getItem('favArr'));
        if(temp && temp.length>=3){
            this.fav = temp;
        }
        let i = this.fav.length;
        let j = 0;
        let pArr = [];
        if(i===3){
            return this.fav;
        }
        while(j<3){ //random three without repeats
            let pick = Math.floor(Math.random()*i);
            if(!pArr.includes(pick)){
                pArr.push(pick);
                j++;
            }
        }
        //pArr = 3 numbers
        pArr = pArr.map(n => this.fav[n]); //map from indexes to players
        return pArr;
    }

    renderMiddle(element){
       
        element.innerHTML ='';
        const tx = document.createElement('div')
        tx.innerHTML = `<h2 class = "middleHead" >Players</h2>`;
       
        element.appendChild(tx);
        let favArr = this.getRandomThree();
        console.log("Random 3", favArr);
        for(let i=0; i<3; i++){
            const div = document.createElement('div');
            console.log(favArr[i]);
            div.className = 'middlePlayers';
            div.innerHTML += `<img src = ${favArr[i].image} class = 'MidPlayerPic'></img>`;
            console.log(favArr[i]);
            let proj = stats.calcProjSingle(favArr[i]);
            div.innerHTML += `<h2 class = 'midPlayerText'>${favArr[i].name} Projected: ${proj} vs. ${favArr[i].nextOpp}</h2>`;
            
            element.appendChild(div);
        }
    }
    renderLeft(element){
        element.innerHTML ='';
        let r = Math.floor(Math.random()*3);
        let fav = this.getRandomThree()[r];
        let proj = stats.calcProjSingle(fav);
        let opp = fav.nextOpp;  


        const tx = document.createElement('div')
        tx.innerHTML = `<h2 class = "leftHead" >Player</h2>`;
       
        element.appendChild(tx);
        const div = document.createElement('div');
        
        div.innerHTML += `<img src = ${fav.image} class = 'leftPic'></img>`;
        
        div.innerHTML += `<h2 class = "leftName">${fav.name}</h2>`;
        div.innerHTML += `<h3 class = "leftOpp">vs. ${opp}</h3>`;
        div.innerHTML += `<h2 class = "leftProj">Projected:  ${proj}</h3>`;
        div.innerHTML += `<h2 class = "leftPts">Avg:  ${fav.avg}</h2>`;
        if(fav.lastGame.pts<fav.lastProj){
            div.innerHTML += `<h2 class = "leftDiffB">Last Game:  ${fav.lastGame.pts}</h2>`;    
        } else{
            div.innerHTML += `<h2 class = "leftDiffG">Last Game:  ${fav.lastGame.pts}</h2>`;
        }
        element.appendChild(div);
    }

    renderBottom(element){
        element.innerHTML ='';
        const tx = document.createElement('div')
        tx.innerHTML = `<h2 class = "middleHead" >Player</h2>`;
        element.appendChild(tx);

        let r = Math.floor(Math.random()*3);
        let fav = this.getRandomThree()[r];
        let proj = stats.calcProjSingle(fav);
        let opp = fav.nextOpp;  

        const div = document.createElement('div');
        div.innerHTML += `<img src = ${fav.image} class = 'bottomFavPic'></img>`;
        div.innerHTML += `<h2 class = "bottomFavName">${fav.name}</h2>`;
        div.innerHTML += `<h3 class = "bottomFavOpp">vs. ${opp}</h3>`;
        div.innerHTML += `<h2 class = "bottomFavProj">Projected:  ${proj}</h3>`;
        div.innerHTML += `<h2 class = "bottomFavPts">Avg:  ${fav.avg}</h2>`;
        if(fav.lastGame.pts<fav.lastProj){
            div.innerHTML += `<h2 class = "bottomDiffB">Last Game:  ${fav.lastGame.pts}</h2>`;    
        } else{
            div.innerHTML += `<h2 class = "bottomDiffG">Last Game:  ${fav.lastGame.pts}</h2>`;
        }
        element.appendChild(div);


    }
        
}

let favs = new Favorites();
export { favs };