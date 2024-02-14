import './App.css';
import Home from './Pages/Home';
import { Route, Routes } from "react-router-dom";
import Movie from "./Pages/Movie";
import Search from './Pages/Search';
import Basket from './Components/Basket';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/search" element={<Search/>}/>
      <Route path="/favorites" element={<Basket />} />
    </Routes>
  );
}

export default App;
