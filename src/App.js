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
            <Menu/>
            <Header header={header}/>
            <Content changeHeader={this.changeHeader}/>
        </div>
      </Router>
    );
  }
}

class Menu extends Component{
    render(){
      return(
        <div className="Menu">
            <nav>
                <ul> 
                  <li>
                    <Link to="/">TOP 100 Steam Games</Link>
                  </li>
                  <li>
                    <Link to="/stats">Games statistic</Link>
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
          const{changeHeader}=this.props;
          return(
            <div className="Content">
                <Route exact path="/" render={(props)=>(<MainView result={result} changeHeader={changeHeader} {...props}/>)}/>
                <Route exact path="/stats" render={(props)=>(<ChartView result={result} changeHeader={changeHeader} {...props}/>)} />
                <Route exact path="/game/:appid" render={(props)=>(<TableView changeHeader={changeHeader} {...props}/>)} />
            </div>
          );
      }

}

class MainView extends Component{
		componentDidMount(){
			const{changeHeader}=this.props;
      changeHeader("Top 100 Games");
		}
      render(){
        const{result}=this.props;
        return(
          <div className="MainView">
              {
                  Object.keys(result).map(keys=>
                      <div key={result[keys].appid}>
                      <p>
                          <span>{result[keys].name} </span>
                          <Link to={`/game/${result[keys].appid}`}>Details</Link>
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
            const{changeHeader}=this.props;
            changeHeader("Game details");
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
	componentDidMount(){
	const{changeHeader}=this.props;
  changeHeader("Best 10 Games Players Rank");
        }
      render(){
        const{result}=this.props;
        var games=[];
        var players=[];
        Object.keys(result).slice(0,10).map(key=>{
                    games.push(result[key].name);
                    players.push(result[key].players_2weeks);
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
