import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../App.css';

class Navbar extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand navbar-light bg-light"> 
                    <a className="navbar-brand">Recipe Book</a> 

                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Recipes
                            </Link>
                    </li>
                    <li className="nav-item">
                            <Link to={"/shop"} className="nav-link">
                                Shopping List
                            </Link>
                    </li>
                </div>
                </nav >
            </div>
        )
    }
}
export default Navbar;