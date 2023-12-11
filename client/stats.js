import { playerList } from "./playerList.js";
const pl = playerList;
pl.loadPlayers();

//functions to calculate projections and streaks

function calcStreak(player){
    let streak = 0;
    let i = 4;
    if(player.lastFive[i] >= calcProjSingle(player)){
        streak++;
        i--;
        while(player.lastFive[i] > calcProjSingle(player) && i>=0){
            streak++;
            i--;
        }
    } else if(player.lastFive[i] < calcProjSingle(player)){
        streak--;
        i--;
        while(player.lastFive[i] < calcProjSingle(player) && i>=0){
            streak--;
            i--;
        }
    } 

    
    return streak;

}

function calcProjList(){
    let projArr = [];
    playerList.players.map(p => projArr.push({name: p.name, proj: calcProjSingle(p)}))
    return projArr;
}

function calcOldProj(player){
    let proj = 0;
    let avg = player.avg;
    let lastFour = [player.lastFive[0], player.lastFive[1], player.lastFive[2], player.lastFive[3]];
    let init = 1.00;
    let change = lastFour.reduce((acc,curr) => curr<avg? acc-.025: acc+.025, init);
    proj = Math.round(avg * change);
    return proj;

}

function calcProjSingle(player){
    let proj = 0;
    let avg = player.avg;
    let lastFour = [player.lastFive[1], player.lastFive[2], player.lastFive[3], player.lastFive[4]];
    let init = 1.00;
    let change = lastFour.reduce((acc,curr) => curr<avg? acc-.025: acc+.025, init);
    proj = Math.round(avg * change);
    return proj;
}

export { calcProjList };
export { calcProjSingle };
export { calcOldProj };
export { calcStreak };