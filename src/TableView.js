import React, { Component } from 'react';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const baseUrl='http://steamspy.com/api.php?request=';
const reqAppDetails='appdetails&appid=';

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
              <p>Developer: <span>{result.developer}</span></p>
              <p>Publisher: <span>{result.publisher}</span></p>
              <p>Score rank: <span>{result.score_rank}</span></p>
              <p>Owners: <span>{result.owners}</span></p>
              <p>Players since March 2009: <span>{result.players_forever}</span></p>
              <p>Players in the last 2 weeks: <span>{result.players_2weeks}</span></p>
              <p>Average playtime since March 2009: <span>{result.average_forever}</span></p>
              <p>Average playtime in the last 2 weeks: <span>{result.average_2weeks}</span></p>
              <p>Median playtime: <span>{result.median_forever}</span></p>
              <p>Median playtime in the last 2 weeks: <span>{result.median_2weeks}</span></p>
              <p>CCU (yesterday): <span>{result.ccu}</span></p>
              <p>Price: <span>{(result.price*0.01).toFixed(2)}$</span></p>
          </div>
        );
      }
}

export default TableView;