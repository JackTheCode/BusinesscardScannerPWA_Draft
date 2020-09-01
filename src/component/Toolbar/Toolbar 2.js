import React from 'react'
import './Toolbar.css'


const Toolbar = props => (
    <nav className="header">
    <div className="wraper-header">
      <div className="wrapper-menu-button-left">
        <button className="button-transparent" onClick={props.drawerClickHandler}>
          <img src={require('../../menu-icon.png')} className="icon-menu" alt="menu"/>
        </button>
      </div>

      <div className="app-title">
        <h3>
          Minup PWA Demo
        </h3>
      </div>
      <div className="wrapper-menu-button-right">
        <button className="button-transparent">
          <img src={require('../../filter-icon.png')} className="icon-menu" alt="menu"/>
        </button>
      </div>
    </div>
  </nav>
)

export default Toolbar

