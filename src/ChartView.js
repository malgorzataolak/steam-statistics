import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

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
                      backgroundColor: 'rgba(2,38,54,0.2)',
                      borderColor: 'rgba(2,38,54,1)',
                      borderWidth: 1,
                      hoverBackgroundColor: 'rgba(2,38,54,0.4)',
                      hoverBorderColor: 'rgba(2,38,54,1)',
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
          return(
            <div className="ChartView">
            <h2>by number of players in the last 2 weeks</h2>
            <div className="chart">
              <Bar
                data={data}
                height={500}
                options={options}
              />
              </div>
            </div>
          );
            }

}

export default ChartView;