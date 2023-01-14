import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async(req, res) => {
  const event = req.body;

  events.push(event);

  try {
    await axios.post("http://posts-srv:4000/events", event);
  } catch (e) {
    console.log("Could not emit event to posts-srv service");
  }
  try {
    await axios.post("http://comments-srv:4001/events", event);
  } catch (e) {
    console.log("Could not emit event to comments-srv service");
  }
  try {
    await axios.post("http://query-srv:4002/events", event); 
  } catch (e) {
    console.log("Could not emit event to query-srv service");
  }
  try {
    await axios.post("http://moderation-srv:4003/events", event);
  } catch (e) {
    console.log("Could not emit event to moderation-srv service");
  }



  res.send({ status: "OK" });
});

app.get('/events', (req,res)=>{
res.send(events);
})

app.listen(4005, () => {
  console.log("Listening on port : 4005");
});
