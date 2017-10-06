import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className="App">
          <Menu />
          <Header />
          <Content />
      </div>
    );
  }
}

class Menu extends Component{
    render(){
      return(
        <div className="Menu">
            <nav>
                <ul> 
                  <li>Top 100 Games</li>
                  <li>Statistics</li>
                </ul>
            </nav>
        </div>
        );
    }

}

class Header extends Component{
    render(){
        return(
          <div className="Header">
            <header>
                <h1>Default header</h1>
            </header>
          </div>
        );
    }

}

class Content extends Component{
      render(){
          return(
            <div className="Content">
              <MainView />
              <TableView />
              <ChartView />
            </div>
          );
      }

}

class MainView extends Component{
      render(){
        return(
          <div className="MainView">
              <p>MainView content</p>
          </div>
        );
      }

}

class TableView extends Component{
      render(){
        return(
          <div className="TableView">
              <p>TableView content</p>
          </div>
        );
      }
}

class ChartView extends Component{
      render(){
        return(
          <div className="ChartView">
              <p>ChartView content</p>
          </div>
        );
      }

}

export default App;
