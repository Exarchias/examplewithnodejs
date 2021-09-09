const express = require('express');
const app = express();
const {MongoClient} = require('mongodb')
var msg = "no db yet!"

app.use((req, res, next) => {
    console.log(new Date());

    next();
});

app.use(express.static(__dirname + "/public"));

// Serving HTML-file
app.get("/", (req, res) => {
    res.sendFile("index.html");
});

// Handling API-request
app.get("/api", async (req, res) => {
    // ... Fetch data from database and send in response
    doStuff2MongoDB().catch(console.error)
    const dataFromDatabase = {
        messge: msg
    };
    
    res.send(dataFromDatabase);
});

app.listen(3000, () => {
    console.log("Server running on port " + 3000);
});


async function doStuff2MongoDB(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    //const uri = "mongodb+srv://<username>:<password>@localhost:27017/test?retryWrites=true&w=majority";
    const uri = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
  
  
    const client = new MongoClient(uri);
  
    try {
        // Connect to the MongoDB cluster
        await client.connect();
  
        // Make the appropriate DB calls
        await  listDatabases(client);
  
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
  }
  
  
  async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
  
    console.log("Databases:");
    msg = "Databases are working:"
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    databasesList.databases.forEach(db => msg = msg + db.name + " | ");
     
  };