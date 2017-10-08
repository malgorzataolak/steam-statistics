import React, { Component } from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Menu from './Menu';
import Header from './Header';
import Content from './Content';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={header:""};
    this.changeHeader=this.changeHeader.bind(this);
  }
  componentDidMount(){
    document.title="Steam Statistics";
  }

  changeHeader(newHeader){
      this.setState({header:newHeader});
  }

  render() {
    const{header, }=this.state;
    return (
      <Router>
        <div className="container">
          <div className="navbar">
            <h1 className="nav-header">STEAM STATISTICS</h1>
            <Menu/>
            </div>
            <Header header={header}/>
            <Content changeHeader={this.changeHeader}/>
            <footer>Małgorzata Olak, data from SteamSpy</footer>
        </div>
      </Router>
    );
  }
}

export default App;
