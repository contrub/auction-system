import {BrowserRouter, Routes, Route} from "react-router-dom"

import Navbar from "./components/Navbar"

import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"

import Users from "./pages/Users";
import User from "./pages/User"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar/>
        </div>
        <Routes>
            <Route path="/login" element={ <Login/> }/>
            <Route path="/signup" element={ <SignUp/> }/>
            <Route path="/auctions" element={ <Auctions/> }/>
            <Route path="/auctions/:id" element={ <Auction/> }/>
            <Route path="/users" element={ <Users/> }/>
            <Route path="/users/:id" element={ <User/> }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
