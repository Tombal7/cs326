import * as stats from './stats.js';
import { playerList } from "./playerList.js";

await playerList.loadPlayers();


export class ViewMore{
    constructor(playerName){
        this.player = playerList.players.find(p => p.name === playerName);
        this.proj = stats.calcProjSingle(this.player);
        this.lastGame = this.player.lastGame;
        this.lastFive = this.player.lastFive;
        this.avg = this.player.avg;
        this.lastProj = stats.calcOldProj(this.player);
        this.streak = stats.calcStreak(this.player);
        this.nextOpp = this.player.nextOpp;
        this.lastPts = this.player.lastGame.pts;
        this.lastOpp = this.player.lastGame.opp;
    }

    renderMiddle(element){
        element.innerHTML = '';
        element.innerHTML += `<h2 class = vmHead>${this.player.name}</p>`;
        element.innerHTML += `<img src = ${this.player.image} class = vmImg>`;
        element.innerHTML += `<p class="viewMoreText">Average ppg: ${this.avg} `;
        element.innerHTML += `<p class="viewMoreText">Next Opponent: ${this.nextOpp} Projected Points: ${this.proj}</p></p>`; 
        element.innerHTML += `<p class="viewMoreText">Projected Points Last Game: ${this.lastProj} Last Game Result: ${this.lastPts} pts vs. ${this.lastOpp}</p>`;
        element.innerHTML += `<p class="viewMoreText">Streak: ${this.streak}</p>`;
        element.innerHTML += `<p class="viewMoreText">Last Five Games: ${this.lastFive[0]}, ${this.lastFive[1]}, ${this.lastFive[2]}, ${this.lastFive[3]}, ${this.lastFive[4]}</p>`;
          
    }
}