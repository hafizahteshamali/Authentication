import React from 'react'
import {Routes, Route} from "react-router-dom";
import { RoutesData } from './Routes/Routes';

const App = () => {
  return (
    <div>
      <Routes>
        {RoutesData.map((item, index)=>{
          return(
            <Route path={item.path} element={item.element} key={index} /> 
          )
        })}
      </Routes>
    </div>
  )
}

export default App