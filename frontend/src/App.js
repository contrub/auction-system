import {BrowserRouter, Routes, Route} from "react-router-dom"

import Navbar from "./components/Navbar"

import Login from "./pages/auth/Login"

import Users from "./pages/Users";
import User from "./pages/User"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar/>
        </div>
        <Routes>
            <Route path="/users" element={<Users/>}/>
            <Route path="/users" element={ <Users/> }/>
            <Route path="/users/:id" element={ <User/> }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
