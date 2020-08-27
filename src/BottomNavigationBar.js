import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle, faList, faTable, faCamera } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
    route: "/demo",
    icon: faHome,
    label: "Home"
  },{
    route: "/trader",
    icon: faSearch,
    label: "Trader"
  },{
    route: "/guide",
    icon: faTable,
    label: "Guide"
  },
  {
    route: "/report",
    icon: faList,
    label: "Report"
  }
  ,{
    route: "/gaccha",
    icon: faUserCircle,
    label: "Gaccha"
  },{
    route: "/scanner",
    icon: faCamera,
    label: "Scanner"
  }]
const Navigation = (props) => {
return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">
        <div className="container-fluid">
            <a className="navbar-brand" href="/demo">Home</a>
            <Nav className="ml-auto">
              <NavItem>
                <NavLink to="/trader" className="nav-link">
                  Trader
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/guide" className="nav-link">
                  Guide
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/report" className="nav-link">
                  Report
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/gaccha" className="nav-link">
                  Gaccha
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/scanner" className="nav-link">
                  Scanner
                </NavLink>
              </NavItem>
            </Nav>
        </div>
      </nav>

      {/* Bottom Tab Navigator*/}
      <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {
              tabs.map((tab, index) =>(
                <NavItem key={`tab-${index}`}>
                  <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                    <div className="row d-flex flex-column justify-content-center align-items-center">
                      <FontAwesomeIcon size="lg" icon={tab.icon}/>
                      <div className="bottom-tab-label">{tab.label}</div>
                    </div>
                  </NavLink>
                </NavItem>
              ))
            }
          </div>
        </Nav>
      </nav>
      </div>
  )
};
export default Navigation;