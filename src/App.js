import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {Bar} from 'react-chartjs-2';
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
                <Route exact path="/stats" render={(props)=>(<ChartView result={result} {...props}/>)} />
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
        const{result}=this.props;
        var games=[];
        var players=[];

        Object.values(result).slice(0,10).map(item=>{
                    games.push(item.name);
                    players.push(item.players_2weeks);
                    return this;
                  })
                  
          const data = {
                  labels: games,
                  datasets: [
                    {
                      label: 'Players',
                      backgroundColor: 'rgba(255,99,132,0.2)',
                      borderColor: 'rgba(255,99,132,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                      hoverBorderColor: 'rgba(255,99,132,1)',
                      data: players
                    }
                  ]
                };
          const options = {
              scales: {
              xAxes: [{
                ticks: {
                    fontSize:10
                  }
                }]
              },
                  maintainAspectRatio: false
          };
          return (
            <div className="ChartView">
              <Bar
                data={data}
                height={400}
                options={options}
              />
            </div>
          );
            }

}

export default App;
