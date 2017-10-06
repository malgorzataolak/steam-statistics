import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


var defaultHeader="Top 100 Games on Steam";

class App extends Component {
  constructor(props){
    super(props);
    this.state={header:defaultHeader};
    this.changeHeader=this.changeHeader.bind(this);
  }

  changeHeader(newHeader){
      this.setState({header:newHeader});
  }

  render() {
    const{header, }=this.state;
    return (
      <div className="App">
          <Menu changeHeader={this.changeHeader}/>
          <Header header={header}/>
          <Content />
      </div>
    );
  }
}

class Menu extends Component{
    render(){
        const{changeHeader}=this.props;
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
