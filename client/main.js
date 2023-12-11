
import {Favorites} from "./favorites.js";
import {Result} from "./results.js";
import {hotC} from "./hotCold.js";
import {ViewMore} from "./viewMore.js";
import * as crud from './crud.js';
import { playerList } from "./playerList.js";

playerList.loadPlayers();

const favElement = document.getElementById('addfavorite');
const middleElement = document.getElementById('middle');
const playerElement = document.getElementById('players');
const leftElement = document.getElementById('left');
const bottomElement = document.getElementById('bottom');
const msgElement = document.getElementById('buttonmsg');
const clearFavElement = document.getElementById('clearFav');
const resultElement = document.getElementById('results');
const hCElement = document.getElementById('hotCold');
const searchElement = document.getElementById('searchButton');
const editElement = document.getElementById('edit');
const readElement = document.getElementById('read');

const tatumViewMore = document.getElementById('viewMoreJayson Tatum');


const favs = new Favorites();
const result = new Result();
result.renderLeft(leftElement);
favs.renderMiddle(middleElement);
hotC.renderBottom(bottomElement);


readElement.addEventListener('click', async(e) => {

    middleElement.innerHTML = '';
    const allPlayers = await crud.readAllPlayers();
    middleElement.innerHTML = JSON.stringify(allPlayers);
});

editElement.addEventListener('click', () => {
    middleElement.innerHTML = '';

    middleElement.innerHTML += `<h2 class = "middleHead">Create Player</p>`;
    middleElement.innerHTML += '<div class = "create-wrapper">';
    middleElement.innerHTML += '<label for="newName" class = "createLabels">Player Name:</label>';
    middleElement.innerHTML += `<input type="text" id="newName" placeholder="Player Name">`;
    middleElement.innerHTML += '<label for="newImage" class = "createLabels">Image URL:</label>';
    middleElement.innerHTML += `<input type="text" id="newImage" placeholder="Image URL">`;
    middleElement.innerHTML += '<label for="team" class = "createLabels">Team:</label>';
    middleElement.innerHTML += `<input type="text" id="team" placeholder="Team">`;
    middleElement.innerHTML += '<label for="newAvg" class = "createLabels">Average Points:</label>';
    middleElement.innerHTML += `<input type="text" id="newAvg" placeholder="Average Points">`;
    middleElement.innerHTML += '<label for="newLastGame" class = "createLabels">Last Game Points:</label>';
    middleElement.innerHTML += `<input type="text" id="newLastGame" placeholder="Last Game Points">`;
    middleElement.innerHTML += '<label for="newLastGameOpp" class = "createLabels">Last Game Opponent:</label>';
    middleElement.innerHTML += `<input type="text" id="newLastGameOpp" placeholder="Last Game Opponent">`;
    middleElement.innerHTML += '<label for="newLastGameDate" class = "createLabels">Last Game Date:</label>';
    middleElement.innerHTML += `<input type="text" id="newLastGameDate" placeholder="Last Game Date">`;
      
    middleElement.innerHTML += '<label for="newNextOpp" class = "createLabels">Next Opponent:</label>';
    middleElement.innerHTML += `<input type="text" id="newNextOpp" placeholder="Next Opponent">`;

    middleElement.innerHTML += '<p class = "newLastFive">Last Five Games:</p>';
    middleElement.innerHTML += `<label for="game1" class = "createLabels">Game 1:</label>`;
    middleElement.innerHTML += `<input type="text" id="game1" placeholder="Last Five Games">`;
    middleElement.innerHTML += `<label for="game2" class = "createLabels">Game 2:</label>`;
    middleElement.innerHTML += `<input type="text" id="game2" placeholder="Last Five Games">`;
    middleElement.innerHTML += `<label for="game3" class = "createLabels">Game 3:</label>`;
    middleElement.innerHTML += `<input type="text" id="game3" placeholder="Last Five Games">`;
    middleElement.innerHTML += `<label for="game4" class = "createLabels">Game 4:</label>`;
    middleElement.innerHTML += `<input type="text" id="game4" placeholder="Last Five Games">`;
    middleElement.innerHTML += `<label for="game5" class = "createLabels">Game 5:</label>`;
    middleElement.innerHTML += `<input type="text" id="game5" placeholder="Last Five Games">`;

    middleElement.innerHTML += '</div>';
       
    middleElement.innerHTML += '<div id="create-wrapper">';
    middleElement.innerHTML += '<input type="button" id="createPlayer" value="Create Player">'; 
    middleElement.innerHTML += '</div>';

    middleElement.innerHTML += '<div id="update-wrapper">';
    middleElement.innerHTML += '<input type="button" id="updateButton" value="Update Player">';
    middleElement.innerHTML += '</div>';

    middleElement.innerHTML += '<div id="delete-wrapper">';
    middleElement.innerHTML += '<label for="delete">Player Name:</label>';
    middleElement.innerHTML += `<input type="text" id="delete" placeholder="Player Name">`;
    middleElement.innerHTML += '<input type="button" id="deleteButton" value="Delete Player">';
    middleElement.innerHTML += '</div>';

    middleElement.innerHTML += '<div id = "editmsg" class="buttonmsg"></div>';

    const createPlayer = document.getElementById('createPlayer');
    const updatePlayer = document.getElementById('updateButton');
    const deletePlayer = document.getElementById('deleteButton');
    //elements for each input
    const newName = document.getElementById('newName');
    const newAvg = document.getElementById('newAvg');
    const newLastGamePts = document.getElementById('newLastGame');
    const newLastGameOpp = document.getElementById('newLastGameOpp');
    const newLastGameDate = document.getElementById('newLastGameDate');
    const newGame1 = document.getElementById('game1');
    const newGame2 = document.getElementById('game2');
    const newGame3 = document.getElementById('game3');
    const newGame4 = document.getElementById('game4');
    const newGame5 = document.getElementById('game5');
    const newNextOpp = document.getElementById('newNextOpp');
    const team = document.getElementById('team');
    const newImage = document.getElementById('newImage');
    const editmsg = document.getElementById('editmsg');
    //event listener for create player
    createPlayer.addEventListener('click', () => {
        editmsg.innerHTML = '';
        console.log('clicked create player');
        if(playerList.players.some(player => player.name === newName.value)){
            editmsg.innerHTML += '<p>Player already exists</p>';
            return;
        }
        if([newName.value, newAvg.value, newLastGamePts.value, newLastGameOpp.value, newLastGameDate.value, newGame1.value, newGame2.value, newGame3.value, newGame4.value, newGame5.value, newNextOpp.value, team.value, newImage.value].some(val => val === '')){
            editmsg.innerHTML += '<p>Please fill out all fields</p>';
            return;
        }

        crud.createPlayer(newName.value, newImage.value, team.value, newAvg.value, newGame1.value, newGame2.value, newGame3.value, newGame4.value, newGame5.value, newLastGameOpp.value, newLastGamePts.value,  newLastGameDate.value,  newNextOpp.value);
        editmsg.innerHTML = '<p>Player Created!</p>';
        playerList.loadPlayers();
    });

    updatePlayer.addEventListener('click', () => {
        editmsg.innerHTML = '';
        console.log('clicked update player');
        if(newName.value === '' || !playerList.players.some(player => player.name === newName.value)){
            editmsg.innerHTML = '<p>Player does not exist, need valid name</p>';
            return;
        } 
        let player = playerList.players.find(player => player.name === newName.value);
        let arr = [newName.value, newImage.value, team.value, newAvg.value, newGame1.value, newGame2.value, newGame3.value, newGame4.value, newGame5.value, newLastGameOpp.value, newLastGamePts.value, newLastGameDate.value, newNextOpp.value];
        let pArr = [player.name, player.image, player.team, player.avg, player.lastFive[0], player.lastFive[1], player.lastFive[2], player.lastFive[3], player.lastFive[4], player.lastGame.opp, player.lastGame.pts, player.lastGame.date, player.nextOpp];
        
        for(let i = 0; i < arr.length; i++){
            if(arr[i] === ''){
                arr[i] = pArr[i];
            }
        }
        crud.updatePlayer(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12]);
        editmsg.innerHTML = '<p>Player Updated!</p>';
        playerList.loadPlayers();
    });

    deletePlayer.addEventListener('click', () => {
        editmsg.innerHTML = '';
        console.log('clicked delete player');
        if(document.getElementById('delete').value === '' || !playerList.players.some(player => player.name === document.getElementById('delete').value)){
            editmsg.innerHTML = '<p>Player does not exist, need valid name</p>';
            return;
        }
        crud.deletePlayer(document.getElementById('delete').value);
        editmsg.innerHTML = '<p>Player Deleted!</p>';
        playerList.loadPlayers();
    });
  
});

//players
playerElement.addEventListener('click', () => { //This is actually players
    editElement.innerHTML = '';
    console.log('clicked players');
    favs.renderMiddle(middleElement);
    hotC.renderBottom(bottomElement);
    result.renderLeft(leftElement);
});

//results
resultElement.addEventListener('click', () => {
    editElement.innerHTML = '';
    console.log('clicked results');
    result.renderMiddle(middleElement);
    favs.renderLeft(leftElement);
    hotC.renderBottom(bottomElement);
});

//hot cold
hCElement.addEventListener('click', () => {
    editElement.innerHTML = '';
    console.log('clicked hot cold');
    hotC.renderMiddle(middleElement);
    result.renderLeft(leftElement);
    favs.renderBottom(bottomElement);
    hotC.renderMiddle(middleElement);
});

//add Fav
favElement.addEventListener('click', () => {
    editElement.innerHTML = '';
    console.log('clicked favorites');
    favs.addFavorite(document.getElementById('favName').value, msgElement);
    result.renderLeft(leftElement);
    favs.renderMiddle(middleElement);
    hotC.renderBottom(bottomElement);
    
});

clearFavElement.addEventListener('click', () => {
    editElement.innerHTML = '';
    console.log('clicked clear favorites');
    favs.clearFavorites();
    result.renderLeft(leftElement);
    favs.renderMiddle(middleElement);
    hotC.renderBottom(bottomElement);4
    msgElement.innerHTML = '<p>Favorites cleared!</p>';
    //results render left and hot cold render bottom
});

//SEarch
searchElement.addEventListener('click', () => {
    editElement.innerHTML = '';
    console.log('clicked search');
    const viewM = new ViewMore(document.getElementById('searchText').value);
    viewM.renderMiddle(middleElement);
});

