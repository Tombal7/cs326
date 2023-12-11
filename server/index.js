import express from 'express';
import { PlayerDatabase } from './playerdb.js';

const PlayerRoutes = (app, db) => {
  app.use(express.static('client'));

  app.post('/player/create', async (req, res) => {
    try {
      const { name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp } = req.query;
      const nameE = name.split('%20').join(' ');
      const teamE = team.split('%20').join(' ');
      const player = await db.createPlayer(nameE, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp);
      res.send(JSON.stringify(player));
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/player/read', async (req, res) => {
    try {
      const { name } = req.query;
      const player = await db.readPlayer(name);
      res.send(JSON.stringify(player));
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.put('/player/update', async (req, res) => {
    try {
      const { name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp } = req.query;
      const player = await db.updatePlayer(name, pic, team,avg, last1, last2, last3, last4, last5, lGopp, lGpts, lGdate, nextOpp);
      const nameE = name.split('%20').join(' ');
      const teamE = team.split('%20').join(' ');
      res.send(JSON.stringify(player));
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.delete('/player/delete', async (req, res) => {
    try {
      const { name } = req.query;
      const nameE = name.split('%20').join(' ');
      const player = await db.deletePlayer(nameE);
      res.send(JSON.stringify(player));
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/player/all', async (req, res) => {
    console.log('read all');
    try {
      const players = await db.readAllPlayers();
      res.send(JSON.stringify(players));
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/', (req, res) => {
    res.redirect('/player/all');
  });

  return app;
};

const start = async () => {
  const db = await PlayerDatabase(process.env.DATABASE_URL).connect();
  const app = PlayerRoutes(express(), db);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
  });
};

start();
