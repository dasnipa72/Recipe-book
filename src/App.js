import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import AddRecipe from './components/Recipes';
import Shopping from './components/Shopping';
import UpdateShopping from './components/UpdateShopping';
import Navbar from './components/Navbar';
import ListRecipe from './components/ListRecipe';
import UpdateRecipe from './components/UpdateRecipe';
import './App.css';


class App extends Component{
  render(){
    return(
      <>
       <Navbar/> 
      <Switch>
        <Route path={['/','/recipes']} exact component={ListRecipe}></Route>
        <Route path='/recipes/:id' component={UpdateRecipe}></Route>
        <Route path='/shop' exact component={Shopping}></Route>
        <Route path='/shop/:id' component={UpdateShopping}></Route>
        <Route path='/nav' component={Navbar}></Route>
        <Route path='/add' component={AddRecipe}></Route>
        <Route component={Error}></Route>
      </Switch>
      </>
    )
  }
}

export default App;
