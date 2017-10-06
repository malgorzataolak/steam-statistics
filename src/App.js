import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
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
      <Router>
        <div className="containter">
            <Menu changeHeader={this.changeHeader}/>
            <Header header={header}/>
            <Content />
        </div>
      </Router>
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
                  <li>
                    <Link to="/" onClick={()=>changeHeader(defaultHeader)}>TOP 100 Steam Games</Link>
                  </li>
                  <li>
                    <Link to="/stats" onClick={()=>changeHeader("Game statistics")}>Games statistic</Link>
                  </li>
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
                <Route exact path="/" component={MainView}/>
                <Route exact path="/stats" component={ChartView} />
                <Route exact path="/game/:appid" component={TableView} />
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
