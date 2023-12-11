
  export async function createPlayer(name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp) {
    const response = await fetch(
      `/player/create?name=${name}&pic=${pic}&team=${team}&avg=${avg}&last1=${last1}&last2=${last2}&last3=${last3}&last4=${last4}&last5=${last5}&lGopp=${lGopp}&lGpts=${lGpts}&lGdate=${lGdate}&nextOpp=${nextOpp}`,
      {
        method: 'POST',
      }
    );
    const data = await response.json();
    return data;
  }
  
  export async function readPlayer(name) {
    const response = await fetch(`/player/read?name=${name}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  
  export async function updatePlayer(name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp) {
    const response = await fetch(
      `/player/update?name=${name}&pic=${pic}&team=${team}&avg=${avg}&last1=${last1}&last2=${last2}&last3=${last3}&last4=${last4}&last5=${last5}&lGopp=${lGopp}&lGpts=${lGpts}&lGdate=${lGdate}&nextOpp=${nextOpp}`,
      {
        method: 'PUT',
      }
    );
    const data = await response.json();
    return data;
  }
  
  export async function deletePlayer(name) {
    const response = await fetch(`/player/delete?name=${name}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
  
  export async function readAllPlayers() {
    const response = await fetch(`/player/all`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;
  }
  