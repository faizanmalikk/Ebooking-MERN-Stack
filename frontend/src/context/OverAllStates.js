import React,{ useEffect, useState } from "react";
import StatesContext from "./StatesContext";
const OverAllStates = (props)=>{
  
    const [destination, setdestination] = useState('')
    const [type, settype] = useState('')
    const [options, setOptions] = useState({
      adult: 1,
      children: 0,
      room: 1
    })

    const [dates, setDates] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);

    const [userInfo, setUserInfo] = useState('')

    useEffect(() => {
   
      localStorage.setItem('dates' , JSON.stringify(dates))

    }, [dates])
    
    
  return(
       <StatesContext.Provider 
       value={{ 
        destination, setdestination ,
        options, setOptions,
        dates, setDates,
        userInfo, setUserInfo,
        type, settype

       }}>
           {props.children}
       </StatesContext.Provider>
    )
}
export default OverAllStates;