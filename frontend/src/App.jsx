import React, { useEffect, useState } from 'react'
import "./App.css"
import search_logo from "./Assets/search.png"
import climate_logo from "./Assets/cloud.png"
import hum_logo from "./Assets/humidity.png"
import speed_logo from "./Assets/wind.png"
import axios from "axios"



const App = () => {

  const [temperature,setTemperature] = useState("");
  const [humidity,setHumdity] = useState("");
  const [speed,setSpeed] = useState("");
  const [CITY,setCITY] = useState("hyderabad")

  async function Getreq(){
    const city = document.querySelector(".header input").value;
    const tempdata = await (await axios.get(`http://localhost:3000/weather?q=${city}`)).data    
    if(tempdata!="error"){
    setSpeed(tempdata.wind.speed)
    setHumdity(tempdata.main.humidity)
    setTemperature((tempdata.main.temp-273.15).toFixed(1))
    setCITY(city)
    }
    else{
      alert("city not found")
    }
  }

  useEffect(()=>{
    fetchweather(CITY);
  })

  async function fetchweather(city){
    // const city = "india";
    const tempdata = await (await axios.get(`http://localhost:3000/weather?q=${city}`)).data    
    if(tempdata!="error"){
      setSpeed(tempdata.wind.speed)
      setHumdity(tempdata.main.humidity)
      setTemperature((tempdata.main.temp-273.15).toFixed(1))
      setCITY(city)
      }
      else{
        alert("city not found")
      }
  }

  return (
    <div className='main'>
      <div className='weather'>
          <div className="header">
            <input type="search" placeholder='Enter the place' />
            <button onClick={Getreq} ><img src={search_logo} alt="" /></button>
          </div>
          <div className="climate-img">
            <img src={climate_logo} alt="" />
          </div>
          <div className="temp-body">
            <div className="temp">
                <h1>{temperature}&deg;C</h1>
                <h3>{CITY}</h3>
            </div>
          </div>
          <div className="bottom">
            <div className="hum">
              <div className="hum-left"><img src={hum_logo} alt="" /></div>
              <div className="hum-right">
                <h3>{humidity}%</h3>
                <h5>Humidity</h5>
              </div>
            </div>
            <div className="speed">
              <div className="speed-left"><img src={speed_logo} alt="" /></div>
              <div className="speed-right">
                <h3>{speed}Km/h</h3>
                <h5>Wind Speed</h5>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default App