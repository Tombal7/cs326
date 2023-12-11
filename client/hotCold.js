import { playerList } from "./playerList.js";
import { calcProjSingle, calcStreak } from "./stats.js";

await playerList.loadPlayers();

export class HotCold{
    //Rendering hot and cold players and functions for finding hottest/coldest streaks
    constructor(){
        this.sorted = this.extremes();
        this.hotPlayers = this.sorted.hottest;
        this.coldPlayers = this.sorted.coldest;
        this.hotPlayer;
        if(this.hotPlayers.length===1){
            this.hotPlayer = this.hotPlayers[0];
        } else {
            this.hotPlayer = this.hotPlayers[Math.floor(Math.random()*this.hotPlayers.length)];
        }
        this.coldPlayer;
        if(this.coldPlayers.length===1){
            this.coldPlayer = this.coldPlayers[0];
        } else {   
            this.coldPlayer = this.coldPlayers[Math.floor(Math.random()*this.coldPlayers.length)];
        }
        this.hottestThree = this.sorted.hotThree;
        this.coldestThree = this.sorted.coldThree;
    }


    extremes(){
        //sorts players by streak and returns hottest and coldest Threes never used but could be used for a top three hottest/coldest
        let ex = playerList.players.sort((a,b) => calcStreak(b) - calcStreak(a)).slice(0,3);
        ex = ex.map(p => calcStreak(p));
        let hottest = ex[0];
        let coldest = ex[ex.length-1];
        let hot = playerList.players.filter(p => calcStreak(p) === hottest);
        let cold = playerList.players.filter(p => calcStreak(p) === coldest);
        let hotThree = playerList.players.filter(p => calcStreak(p) === hottest).slice(0,2);
        let coldThree = [];
        let i = playerList.players.length-1;
        while(coldThree.length<3){
            coldThree.push(cold[i]);
            i--;
        }
        
        return {hottest: hot, coldest: cold, hotThree: hotThree, coldThree: coldThree};
    }

    renderBottom(element){
        element.innerHTML = '';
        const tx = document.createElement('div')
        tx.innerHTML = `<h2 class = "middleHead" >Hot & Cold</h2>`;
       
        element.appendChild(tx);
        const div = document.createElement('div');
            div.className = 'bottomHot';
            div.innerHTML += `<img src = 'flame.png' class = 'bottomHotPic'></img>`;
            div.innerHTML += `<h2 class = "bottomHotStreak">x ${calcStreak(this.hotPlayer)}</h2>`;
            div.innerHTML += `<img src = ${this.hotPlayer.image} class = 'bottomHotPlayerPic'></img>`;

            element.appendChild(div);

        const div2 = document.createElement('div');
        div.className = 'bottomCold';
        div.innerHTML += `<img src = 'ice.png' class = 'bottomColdPic'></img>`;
        div.innerHTML += `<h2 class = "bottomColdStreak">x ${Math.abs(calcStreak(this.coldPlayer))}</h2>`;
        div.innerHTML += `<img src = ${this.coldPlayer.image} class = 'bottomColdPlayerPic'></img>`;
        
        element.appendChild(div);
    }

    renderMiddle(element){
        element.innerHTML = '';
        const tx = document.createElement('div')
        tx.innerHTML = `<h2 class = "middleHead" >Hot & Cold</h2>`;
       
        element.appendChild(tx);
        const div = document.createElement('div');
            div.className = 'bottomHot';
            div.innerHTML += `<img src = 'flame.png' class = 'bottomHotPic'></img>`;
            div.innerHTML += `<h2 class = "bottomHotStreak">x ${calcStreak(this.hotPlayer)}</h2>`;
            div.innerHTML += `<img src = ${this.hotPlayer.image} class = 'bottomHotPlayerPic'></img>`;
            
            let avgDiff = this.hotPlayer.lastFive.reduce((acc,curr) => acc + (curr -calcProjSingle(this.hotPlayer)), 0)/5;
            if(avgDiff>=0){
                div.innerHTML += `<h2 class = "bottomHotAvgDiffG">Average Difference compared to next Projected: +${avgDiff}</h2>`;
            }
            else{
                div.innerHTML += `<h2 class = "bottomHotAvgDiffB">Average Difference compared to next Projected: ${avgDiff}</h2>`;
            }
        element.appendChild(div);

        const div2 = document.createElement('div');
        div.className = 'bottomCold';
        div.innerHTML += `<img src = 'ice.png' class = 'bottomColdPic'></img>`;
        div.innerHTML += `<h2 class = "bottomColdStreak">x ${Math.abs(calcStreak(this.coldPlayer))}</h2>`;
        div.innerHTML += `<img src = ${this.coldPlayer.image} class = 'bottomColdPlayerPic'></img>`;
        
        let avgDiff2 = this.coldPlayer.lastFive.reduce((acc,curr) => acc + (curr -calcProjSingle(this.coldPlayer)), 0)/5;
            console.log("AVG DIFF",avgDiff2)
            if(avgDiff2>=0){
                div.innerHTML += `<h2 class = "bottomColdAvgDiffG">Average Difference compared to next Projected: +${avgDiff2}</h2>`;
            }
            else{
                div.innerHTML += `<h2 class = "bottomColdAvgDiffB">Average Difference compared to next Projected: ${avgDiff2}</h2>`;
            }
        element.appendChild(div);
    }
}

let hotC = new HotCold();
export { hotC };
