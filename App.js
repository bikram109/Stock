import React from 'react';
import './App.css';
import Nav from './Nav';
import Stock from './Stock';
import About from './About';
import StockDetail from './StockDetail';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path = "/" exact component = {Stock}/>
          <Route path = "/stock" exact component = {Stock}/>
          <Route path = "/about" component = {About} />
          <Route path = "/stock/:id" component = {StockDetail}/>
        </Switch>
      </div>
    </Router>
  );

}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default App;
