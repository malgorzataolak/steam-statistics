import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl='http://steamspy.com/api.php?request=';
const reqTop100games='top100in2weeks';
const reqAppDetails='appdetails&appid=';
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
      constructor(props){
        super(props);
        this.state={result:[], };
      }
      componentDidMount(){
            fetch(proxyUrl+baseUrl+reqTop100games)
                .then(response=>response.json())
                .then(result=>this.setState({result}));
        }
      render(){
          const{result}=this.state;
          return(
            <div className="Content">
                <Route exact path="/" render={(props)=>(<MainView result={result} {...props}/>)}/>
                <Route exact path="/stats" component={ChartView} />
                <Route exact path="/game/:appid" render={(props)=>(<TableView {...props}/>)} />
            </div>
          );
      }

}

class MainView extends Component{
      render(){
        const{result}=this.props;
        return(
          <div className="MainView">
              {
                  Object.values(result).map(item=>
                      <div key={item.appid}>
                      <p>
                          <span>{item.name} </span>
                          <Link to={`/game/${item.appid}`}>Details</Link>
                      </p>
                      </div>)
              }
          </div>
        );
      }

}

class TableView extends Component{
    constructor(props){
        super(props);
        this.state={result:[], };
			}
		componentDidMount(){
        fetch(proxyUrl+baseUrl+reqAppDetails+this.props.match.params.appid)
            .then(response=>response.json())
            .then(result=>this.setState({result}));
    }
      render(){
        const{result,}=this.state;
        return(
          <div className="TableView">
              <p>Game: {result.name}</p>
              <p>Developer: {result.developer}</p>
              <p>Publisher: {result.publisher}</p>
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
