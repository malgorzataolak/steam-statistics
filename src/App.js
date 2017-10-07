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
                .then(result=>Object.values(result).sort((a,b)=>b.players_2weeks-a.players_2weeks))
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
          <h2>By players in the last two weeks</h2>
              {	
                  Object.keys(result).map((keys, iterator)=>
                  		
                      <div key={result[keys].appid}>
                      <p>
                      		<span>{iterator+1} </span>
                            <span>{result[keys].name} </span>
                            <span>{result[keys].players_2weeks} </span>
                            <span>Price: {(result[keys].price*0.01).toFixed(2)}$ </span>
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
              <h2>{result.name}</h2>
              <p>Developer: {result.developer}</p>
              <p>Publisher: {result.publisher}</p>
              <p>Score rank: {result.score_rank}</p>
              <p>Owners: {result.owners}</p>
              <p>Players since March 2009: {result.players_forever}</p>
              <p>Players in the last 2 weeks: {result.players_2weeks}</p>
              <p>Average playtime since March 2009: {result.average_forever}</p>
              <p>Average playtime in the last 2 weeks: {result.average_2weeks}</p>
              <p>Median playtime: {result.median_forever}</p>
              <p>Median playtime in the last 2 weeks: {result.median_2weeks}</p>
              <p>CCU (yesterday): {result.ccu}</p>
              <p>Price: {(result.price*0.01).toFixed(2)}$</p>
          </div>
        );
      }
}

class ChartView extends Component{
	componentDidMount(){
	const{changeHeader}=this.props;
  changeHeader("Best 10 Games");
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
                      label: 'Number of players',
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
                    fontSize:8
                  }
                }]
              },
                  maintainAspectRatio: false
          };
          return (
            <div className="ChartView">
            <h2>By number of players in the last 2 weeks</h2>
              <Bar
                data={data}
                height={500}
                options={options}
              />
            </div>
          );
            }

}

export default App;
