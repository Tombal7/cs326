import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export const PlayerDatabase = (dburl) => {
  ;
  return {
    connect: async () => {
      const p = new Pool({
        connectionString: dburl,
        ssl: { rejectUnauthorized: false },
      });
      return PlayerQuery(p, await p.connect());
    },
  };
};

const PlayerQuery = (pool, client) => {
  
  return {
    init: async () => {
      
      const queryText = `
        CREATE TABLE IF NOT EXISTS players (
          name VARCHAR(50) PRIMARY KEY,
          pic VARCHAR(50),
          team VARCHAR(50),
          avg DECIMAL(3,1),
          last1 DECIMAL(3,1),
          last2 DECIMAL(3,1),
          last3 DECIMAL(3,1),
          last4 DECIMAL(3,1),
          last5 DECIMAL(3,1),
          lGopp VARCHAR(50),
          lGpts DECIMAL(3,1),
          lGdate DATE,
          nextOpp VARCHAR(50)
        );
        
        INSERT INTO 
          players(name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp) 
        VALUES 
          ('Jayson Tatum', 'tatum.jpg', 'Boston Celtics', 27.7,45.0, 23.0, 26.0, 34.0, 21.0, 'CHI', 21, '11/28/23', 'PHI'),
          ('Stephen Curry', 'curry.jpg', 'Golden State Warriors', 29.7, 25.0, 32.0, 16.0, 35.0, 29.0,'SAC',29, '11/28/23', 'LAC'),
          ('Kevin Durant', 'durant.jpg', 'Phoenix Suns', 31.4, 31.0, 38.0, 39.0, 31.0, 32.0, 'GSW',32, '11/22/23','TOR'),
          ('Lebron James', 'lebron.jpg', 'Los Angeles Lakers', 28.9, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS'),
          ('Giannis Antetokounmpo', 'giannis.jpg', 'Milwaukee Bucks', 28.2, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS'),
          ('Luka Doncic', 'luka.jpg', 'Dallas Mavericks', 27.8, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS'),
          ('Damian Lillard', 'lillard.jpg', 'Milwuakee Bucks', 27.3, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS'),
          ('Joel Embiid', 'embiid.jpg', 'Philadelphia 76ers', 27.1, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS'),
          ('Kawhi Leonard', 'kawhi.jpg', 'Los Angeles Clippers', 26.9, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS'),
          ('Bradley Beal', 'beal.jpg', 'Phoenix Suns', 26.8, 30.0, 27.0, 29.0, 31.0, 28.0, 'SAC',28, '11/28/23','SAS');
      `;
      
      const res = await client.query(queryText);
      
    },

    close: async () => {
      client.release();
      await pool.end();
    },

    createPlayer: async (name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp) => {
      const queryText = `
        INSERT INTO players(name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *;
      `;
      const res = await client.query(queryText, [name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp]);
      return res.rows;
    },

    readPlayer: async (name) => {
      const queryText = `
        SELECT * FROM players WHERE name = $1;
      `;
      const res = await client.query(queryText, [name]);
      return res.rows;
    },

    readAllPlayers: async () => {
      const queryText = `
        SELECT * FROM players;
      `;
      const res = await client.query(queryText);
      return res.rows;
    },

    updatePlayer: async (name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp) => {
      const queryText = `
        UPDATE players SET pic = $2, team = $3,avg = $4, last1=$5, last2=$6, last3=$7, last4=$8, last5=$9, lGopp=$10, lGpts=$11, lGdate=$12, nextOpp =$13 where name = $1 RETURNING *;
      `;
      const res = await client.query(queryText, [name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp]);
      return res.rows;
    },

    deletePlayer: async (name) => {
      const queryText = `
        DELETE FROM players WHERE name = $1 RETURNING *;
      `;
      const res = await client.query(queryText, [name]);
      return res.rows;
    },
  };
};
