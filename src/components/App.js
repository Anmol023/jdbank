import React , { Component } from 'react';
import Header from './site/header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignUp from './site/signup/Signup';
import Home from './landing/Home'
import './App.css'
import Login from './site/login/Login';
import NotFound from './site/not-found/NotFound';
import Admin from './admin/Admin';
import Policies from './agent/Policies';
import All from './admin/all/All';
import Sales from './agent/Sales';
import InsCmpny from './inscmpny/InsCmpny';

class App extends Component {
  render() {
      return (
          <div className="background">
          <Router>
              <Header/>
              <Switch>
                  <Route path="/" exact={true} component={Home}/>
                  <Route path="/signup" component={SignUp}/>
                  <Route path="/login" component={Login}/>
                  <Route path="/admin" component={Admin}/>
                  <Route path="/agent" component={Policies}/>
                  <Route path="/all" component={All}/>
                  <Route path="/my-sales" component={Sales}/>
                  <Route path="/inscmpny" component={InsCmpny}/>
                  <Route path="/**" component={NotFound}/>
                  
                  
              </Switch>
              <div className="container-fluid footer text-light bg-info">
                  <div className="float-right">
                      <small>&copy; 2021 JD Bank</small>
                  </div>
              </div>
          </Router>
          </div>
      )
  }
}

export default App;