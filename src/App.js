import { useEffect, useState } from 'react';
import TurkeyMap from 'turkey-map-react'
import  axios  from 'axios';


function App() {
  const [city,setCity] = useState('')
  const [response, setResponse] = useState('')
  const key = "89e03a4c80ca6bba9253704bfa59e514"

  useEffect(() => {
    async function getApi() {
      try{
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=tr`)
         setResponse(response)
      }catch(error){
         console.error(error)
      } 
     }
     if(city !== ''){
      getApi()
     }
  },[city])

  console.log(response)

  return (
    <div>
      <TurkeyMap
        onClick={({name}) => setCity(name)}
      />
      {response && 
      <div>
         <h1>Şehir: {response.data.name}</h1>
         <h2>Derece: {Math.floor(response.data.main.temp)}</h2>
         <h2>Nem: %{response.data.main.humidity}</h2>
         <h2>Açıklama: {response.data.weather[0].description}</h2>
      </div>}
    </div>
  );
}

export default App;
