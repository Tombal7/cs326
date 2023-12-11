//import { calcProjSingle } from './stats.js';
//import fetch from 'node-fetch';
/** A class representing a dictionary. */
import * as crud from './crud.js';

export class PlayerList {
    /** Creates an empty dictionary. */
    constructor() {
      // Initialize the status to "not loaded".
      //   - Other options are "loaded" and "unavailable".
      this.status = 'not loaded';
  
      // Initialize the dictionary to an empty array.
      console.log('initializing player list');
      this.players = [];
    }
  
    /**
     * Loads the dictionary from the server.
     *
     * This method will load in the dictionary from the server, and set the status
     * to "loaded", if successful. Otherwise, it will set the status to
     * "unavailable".
     *
     * @returns {boolean} Returns true if the dictionary is loaded successfully;
     * false otherwise.
     */
    /*
    async loadPlayers() {
      // TODO #1: Implement this method.
        const response = await fetch('playerList.json');
        if(!response.ok){
          this.status = 'unavailable';
          return false;
        }
        this.players = await response.json();
        this.status = 'loaded';
        return true;
    }
   */

    async loadPlayers() {
      const allPlayers = await crud.readAllPlayers();

      this.players = allPlayers.map(p => {
        return {
          name: p.name,
          image: p.pic,
          team: p.team,
          lastGame: {opp:p.lgopp, pts:p.lgpts, date:p.lgdate.split('T')[0]},
          lastFive: [p.last1, p.last2, p.last3, p.last4, p.last5],
          avg: p.avg,
          nextOpp: p.nextopp
        }
      });
      this.status = 'loaded';
    }
    /** Returns true if the dictionary is loaded; false otherwise. */
    isLoaded() {
      return this.status === 'loaded';
    }
  
    /** Returns the words in the dictionary */
    getPlayers() {
      return this.players;
    }
  
    /** Returns the status */
    getStatus() {
      return this.status;
    }
  }
  
  // The one and only dictionary object.
  const playerList = new PlayerList();
  
  export { playerList };
  