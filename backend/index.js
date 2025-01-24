import express from "express"
import axios from "axios"
import cors from "cors"

const server = express();
server.use(cors());
// const city = "mumbai";
server.get(`/weather`,async (req,res)=>{
    try{
        const city = req.query.q;
        const apikey="0720e81189492f3be1a9b859eade0504"
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
        // res.json(data.data)
        res.send(data.data)
        console.log(data.data.wind.speed);
        
    }
    catch(err){
        res.send("error");
        console.error("error cant retrieve data!",err.message);
    }
})

server.listen(3000)