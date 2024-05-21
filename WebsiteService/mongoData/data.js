
const { MongoClient,  } = require("mongodb")
const uri = "mongodb://localhost:27017/"


const getMessages = async (callback) => {
  
  console.log("hello")
  executeQuery (async (client) => {
      const database = client.db("MessageDB")
      const messages = database.collection("messages")
      let messageCursor = await messages.find()
      let messageArray = messageCursor.toArray()
      console.log(messageArray)
      callback(messageArray)
  })
}
const executeQuery = async (query) => {
  const client = new MongoClient(uri);
  try {
      await query(client)
  } catch (err) {
      console.log(err)
  } finally {
      client.close
  }
}

  module.exports = {
    getMessages:getMessages
}
