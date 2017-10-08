import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class Menu extends Component{
    render(){
      return(
        <div className="Menu">
            <nav>
                <ul> 
                  <li>
                    <Link to="/">TOP 100 GAMES</Link>
                  </li>
                  <li>
                    <Link to="/stats">STATISTICS</Link>
                  </li>
                </ul>
            </nav>
        </div>
        );
    }

}

export default Menu;