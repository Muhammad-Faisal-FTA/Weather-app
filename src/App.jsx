import { useState } from 'react';
import loder from './loder.gif'
import './App.css';

function App() {
  let [city, setCity] = useState('')
  let [fweather, setEeather] = useState()
  let [loading, setLoading] = useState(false)
  let checkData = ()=>{
    setLoading(true)
    if(city === ''){
      setLoading(false)
      alert('Plese enter the place name')
    }else{
      fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric` )
       .then((rt)=>rt.json())
       .then((fr)=>{
         if(fr.cod==="404"){
          console.log(fr.cod)
          setLoading(false)
          alert("City noy found..!")
           setEeather(undefined)
         }else{
           setEeather(fr)
           setTimeout(()=>{
              setLoading(false)
              setCity('')
             },100)
            }
          })
        }
      }
      const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
          // alert("Enter key was pressed!", city);
          checkData();
          // Add your desired functionality here
        }}
  return (
    <div className="w-full h-full mt-6 ">
      <h1 className='text-[2.5rem] font-bold text-[black] text-center '>Simple Waether App</h1>

      <div className='w-full flex  justify-around items-center  mt-[3rem]'>
        <div className='w-[20rem]  flex justify-around items-center'>
        <input type="text" value={city} onKeyDown={handleEnterPress} onChange={(e)=>setCity(e.target.value)} autoFocus  placeholder='Enter city name' className='rounded px-2 py-1 h-8 capitalize outline-none placeholder:text-center'/>
        <button className='border border-[#d6c808] bg-[#104e36] h-8 rounded font-semibold  text-[#e5e7c7] px-[0.2rem] gep-1'  onClick={checkData}>Weather</button>
        </div>
      </div>

      <div className='flex justify-center items-center relative  mt-[3rem]'>

        <div className='w-[25rem] p-3 rounded-[0.3rem] relative bg-white'>
          <img src={loder} alt="hjhj" className={`ml-[7rem] absolute  ${loading? '': 'hidden'}`} />   
          {fweather !== undefined? 
           <>
           <h2 className='text-[1.5rem] p-1 font-bold text-[black] text-center'>{fweather.name} <span className='font-[600] text-[1rem]'>{fweather.sys.country}</span></h2>
           <h2 className='text-[1rem] px-3 mt-2 font-[700] flex justify-between items-center'>Temperature : <span className='ml-[] font-[600]'>{fweather.main.temp} &#176;C</span></h2>  
           <h2 className='text-[1rem] px-3 mt-2 font-[700] flex justify-between items-center'>Temperature feels : <span className='ml-[] font-[600]'>{fweather.main.feels_like} &#176;C</span></h2>  
           {/* <h2>Weather of {city}</h2> */}
           {console.log(fweather)}
           <img src={`http://openweathermap.org/img/w/${fweather.weather[0].icon}.png`} alt="" className='px-[9rem]  ' />
           <p className='capitalize px-3 mt-3 font-[700] text-[1rem] flex justify-between items-center'>Humidity : <span className='font-[600]'>{fweather.main.humidity}%</span></p>                  <hr />
           <p className='capitalize px-3 mt-3 text-[0.999rem] font-[700] flex justify-between items-center'>Wind speed :  <span className=' font-[600] lowercase'>{fweather.wind.speed} ms <sup>-1</sup> </span></p>                <hr />  
           <p className='capitalize px-3 mt-3 text-[0.999rem] font-[700] flex justify-between items-center'>Pressure :  <span className=' font-[600] lowercase'>{fweather.main.pressure} mb</span></p>  <hr />  
           <p className='capitalize px-3 mt-3 text-[0.999rem] font-[700] flex justify-between items-center'>Description :  <span className=' font-[600]'>{fweather.weather[0].description}</span></p>  <hr /> 
           <p className='capitalize px-3 mt-3 text-[0.999rem] font-[700] flex justify-between items-center'>Visibility range:  <span className=' font-[600] lowercase'>{fweather.visibility} meters</span></p>        <hr />  
           {/* <p className='capitalize px-3 text-[0.999rem] font-[700] flex justify-between items-center'>Sea Level:  <span className=' font-[600] lowercase'>{fweather.main.sea_level}</span></p>  <hr />   */}
           <marquee className='mt-4 text-[#6b4b10] font-semibold' behavior="" loop="ininite" direction="left">This is simple weather app project to provide current weather information.</marquee>
           </>
           :
           "Enter  place | Data not found"
          }
           
        </div>
      </div>
       </div>

  );
}

export default App;
