import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import { Completed } from "./pages/Completed"
import { Home } from "./pages/Home"

export default function App(){
  return(
    <Router>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path="/Completed" element={<Completed />}></Route>
        </Routes>
    </Router>
  )
}