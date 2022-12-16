import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import IMG from './favicon.png';

const Nav = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow justify-content-between">
                <div className="d-flex justify-content-start">
                    <Link className="navbar-brand" to="/"><img src={IMG} alt="" width="50px" height="50px" /></Link>
                    <h1 style={{ fontSize: "35px" }}><Link className="navbar-brand" to="/">Rest Countries</Link></h1>
                </div>
                <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex justify-content-around">
                        <Link className="nav-item nav-link active" to="/">Home</Link>
                        <Link className="nav-item nav-link" to="/about">About</Link>
                        <Link className="nav-item nav-link" to="/blog">Blog</Link>
                        <Link className="nav-item nav-link" to="/contact">Contact</Link>
                        <form className="form-inline d-flex">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search country here" aria-label="Search"
                                onChange={(e) => {
                                    setSearchText(e.target.value);}}
                            />
                            <Link to={`/countrydetails/${searchText}`} className='btn btn-primary shadow w-25'>Search</Link>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;