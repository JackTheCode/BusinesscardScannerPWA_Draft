import React, { Component } from 'react';
import './App.css';
import BottomNavigation from './BottomNavigationBar'


import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Home';
import Trader from './Trader';
import Guide from './Guide';
import Report from './Report'
import Gaccha from './Gaccha'
import Scanner from './Scanner'
import Toolbar from './component/Toolbar/Toolbar';
import SideDrawer from './component/SideDrawer/SideDrawer'
import Backdrop from './component/Backdrop/Backdrop'

class App extends Component {
  state = {
    sideDrawerOpen: false,
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return {
        sideDrawerOpen: !prevState.sideDrawerOpen 
      }
    })
  }
  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  }
 render() {
  let sideDrawer;
  let backdrop;
  if (this.state.sideDrawerOpen) {
    backdrop = <Backdrop click={this.backdropClickHandler} />
    sideDrawer = <SideDrawer show={this.state.sideDrawerOpen}/>
  }
  return (
    
    <div className="App">
      
       <main >
       <BrowserRouter>
       <BottomNavigation />
       <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
       <Switch>
          <Route path="/demo" component={Home} />
          <Route path="/trader" component={Trader} />
          <Route path="/guide" component={Guide} />
          <Route path="/report" component={Report} />
          <Route path="/gaccha" component={Gaccha} />
          <Route path="/scanner" component={Scanner} />
        </Switch>
      </BrowserRouter>
       </main>
       {sideDrawer}
       {backdrop}
        
    </div>
  );
}
}

export default App;
