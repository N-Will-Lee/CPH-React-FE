import React from 'react';
import ProfileGame from "./ProfileGame";
import { Table } from "reactstrap";


const Profile = (props) => {
    
    let myAddress = props.myAddress;
    // let myUnconfirmedGames = [];

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

    function getMyConfirmedGames() {
        let myUnconfirmedGames = [];
        for (let i=0; i<props.allGames.length; i++) {
            if((props.allGames[i][0] === myAddress || props.allGames[i][1] === myAddress) && props.allGames[i][7] === true)  {
                myUnconfirmedGames.push(props.allGames[i]);
            }
        }
        return myUnconfirmedGames.sort(compare);
    }

    const createList = getMyConfirmedGames().map((game, i) =>  {
        return  (
            <ProfileGame 
                key={i}
                game={game}
                handleConfirmGame={props.handleConfirmGame}
                timeConverter={props.timeConverter}
                myAddress={props.myAddress}  
            />
        )
    })

    let winsLossesTotal = props.countWinsLossesTotal(myAddress);
    let wLRatio = Number.parseFloat(winsLossesTotal[0]/winsLossesTotal[1]).toFixed(2);
    

    return(

        <div className="newGame">
            <h1>My Confirmed Games</h1>
            <Table dark>
                <thead>
                    <tr>
                        <th>me</th>
                        <th>opponent</th>
                        <th>winner</th>
                        <th>score</th>
                        <th>wager (eth)</th>
                        <th>time</th>
                    </tr>
                </thead>
                <tbody>
                    {createList}
                </tbody>
            </Table>
            <br/>
            <br/>
            <h5>wins: {winsLossesTotal[0]}  Losses: {winsLossesTotal[1]} </h5>
            <h5>W/L Ratio: {wLRatio}</h5>
        </div>
    )
}

export default Profile