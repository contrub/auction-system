import Users from "./components/Users";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from "./components/Navbar"
function App() {
  return (
    <div>
      <Users/>
    </div>
    <BrowserRouter>
        <div className="App">
            <Navbar/>
        </div>
        <Routes>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
