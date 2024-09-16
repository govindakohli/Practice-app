import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewUser from "./components/newUser";
import UpdateUser from "./components/updateUser";
import Home from "./components/home"
function App() {
  return (
    <>
      <h1>All Users Details </h1>
      <BrowserRouter>
        <Routes>
         
         <Route path="/" element={<Home/>}/>
         <Route path="/addNew" element={<NewUser/>}/>
         <Route path="/UpdateNew/:id" element={<UpdateUser/>}/>
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
