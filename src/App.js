import './App.css';
import Nav from "./components/Nav/Nav";
import Home from "./components/Home/Home";
import Contact from "./components/Contact/Contact";
import NoMatch from './components/NoMatch/NoMatch';
import About from './components/About/About';
import Blog from './components/Blog/Blog';
import Footer from './components/Footer/Footer';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState, useEffect, createContext } from 'react';
import CountryDetails from './components/CountryDetails/CountryDetails';

export const CountriesContext = createContext();

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const url = 'https://restcountries.com/v3.1/all';
        const res = await fetch(url);
        const data = await res.json();
        setCountries(data);
      }
      catch(error){
        alert(error.message);
      }
    }
    fetchData();
  }, [])
  return (
    <CountriesContext.Provider value={[countries, setCountries]}>
      <Router>
        <div className='container'>
          <Nav></Nav>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/countrydetails/:countryName" element={<CountryDetails />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
          <Footer></Footer>
        </div>
      </Router>
    </CountriesContext.Provider>
  );
}

export default App;
