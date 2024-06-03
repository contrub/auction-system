import {BrowserRouter, Routes, Route} from "react-router-dom"

import Navbar from "./components/Navbar"

import Login from "./pages/auth/Login"
import SignUp from "./pages/auth/SignUp"

import Auctions from "./pages/Auctions";
import Auction from "./pages/Auction";
import Users from "./pages/Users";
import User from "./pages/User"
import FinancialStats from "./pages/stats/FinancialStats";

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
            <Route path="/financial-stats" element={ <FinancialStats/> }/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
