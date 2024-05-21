var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function getDataFromDb() {
  try {
    await client.connect();
    const database = client.db('MessageDB'); 
    const messagesCollection = database.collection('messages'); 
    const channelsCollection = database.collection('channels');

    const messages = await messagesCollection.find().toArray();
    const channels = await channelsCollection.find().toArray();

    return { messages, channels };
  } finally {
    await client.close();
  }
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user = {Id:"3892132138210983021", Username:"Spazmann", Email:"email@gmail.com"}
  //const user = null
  if (!user) {
    res.render('login', { title: 'Login' });
  } else {
    try {
      const { messages, channels } = await getDataFromDb();

      const dmList = channels.map(channel => ({
        name: channel.name,
        members: `${channel.Users.length} Members`
      }));

      const messsageList = messages.map(message => ({
        username: message.ChannelID,
        message: message.MessageContent
      }));

      res.render('index', { title: 'Home', dmList, messsageList, user });
    } catch (error) {
      console.error('Error retrieving data from database:', error);
      res.status(500).send('Internal Server Error');
    }
  }
});

module.exports = router;