import {BrowserRouter, Routes, Route} from "react-router-dom"

import Users from "./pages/Users";
import Navbar from "./components/Navbar"

function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <Navbar/>
        </div>
        <Routes>
            <Route path="/users" element={<Users/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
