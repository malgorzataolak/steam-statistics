import React, { Component } from 'react';
import {
  Route
} from 'react-router-dom';
import MainView from './MainView';
import TableView from './TableView';
import ChartView from './ChartView';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl='http://steamspy.com/api.php?request=';
const reqTop100games='top100in2weeks';

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

export default Content;