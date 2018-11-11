import React from 'react';
import IndividualGame from "./IndividualGame";
import { Table } from "reactstrap";


const ConfirmGames = (props) => {
    
    let myAddress = props.myAddress;
    let myUnconfirmedGames = [];

    //looking for all games where boolian at [7] is false
    function getMyUnconfirmedGames() {
        myUnconfirmedGames = [];
        for (let i=0; i<props.allGames.length; i++) {
            let opponent = props.allGames[i][1];
            let gameConfirmed = props.allGames[i][7]

            if(opponent === myAddress && gameConfirmed === false)  {
                myUnconfirmedGames.push(props.allGames[i]);                
            }
        }
        return myUnconfirmedGames.sort(compare);
    }

    //comparing unix time stamps to order games by most recently played
    function compare(a, b) {
        const timeA = a[6];
        const timeB = b[6];
      
        let comparison = 0;
        if (timeA > timeB) {
          comparison = 1;
        } else if (timeA < timeB) {
          comparison = -1;
        }
        return comparison * -1;
      }

    const createList = getMyUnconfirmedGames().map((type, i) =>  {
        return  (
            <IndividualGame 
                key={i}
                game={type}
                handleConfirmGame={props.handleConfirmGame}
                timeConverter={props.timeConverter}  
            />
        )
    })


    return(
        <div className="confirmGames">
            <h3>Confirm Games</h3>
            <Table dark>
                <thead>
                    <tr>
                        <th>me</th>
                        <th>opponent</th>
                        <th>winner</th>
                        <th>score</th>
                        <th>wager (eth)</th>
                        <th>time</th>
                        <th>confirm</th>
                    </tr>
                </thead>
                <tbody>
                    {createList}
                </tbody>
            </Table>
        </div>
    )
}

export default ConfirmGames