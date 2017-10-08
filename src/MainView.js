import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';

class MainView extends Component{
	  componentDidMount(){
			const{changeHeader}=this.props;
      		changeHeader("Top 100 Games");

		}

      render(){
        const{result}=this.props;
        return(
          <div className="MainView">
          <h2>by players in the last two weeks</h2>
          <div className="main-title">
          <p><span className="name">Name </span>
             <span className="players">Players </span>
             <span className="price">Price </span>
         </p>
          </div>
              {	
                  Object.keys(result).map((keys, iterator)=>
                  		
                      <div className="main-content" key={result[keys].appid}>
                      <p>
                            <span className="name">{iterator+1}. {result[keys].name} </span>
                            <span className="players">{result[keys].players_2weeks} </span>
                            <span className="price">{(result[keys].price*0.01).toFixed(2)}$ </span>
                            <Link to={`/game/${result[keys].appid}`}>DETAILS</Link>
                      </p>
                      </div>)
              }
          </div>
        );
      }

}

export default MainView;