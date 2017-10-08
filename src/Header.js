import React, { Component } from 'react';

class Header extends Component{
    render(){
        const{header}=this.props;
        return(
          <div className="Header">
            <header>
                <h1>{header}</h1>
            </header>
          </div>
        );
    }

}

export default Header;