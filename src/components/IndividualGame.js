import React from 'react';
import { Button } from 'reactstrap';



const IndividualGame = (props) => {

    let myAddress = props.game[0].substring(0,5);
    let oppAddress = props.game[1].substring(0,5);
    let winnerAddress = props.game[2].substring(0,5);

    // find out who is the winner
    function winnerName()   {
        if(winnerAddress === myAddress) {
            return "Me";
        }
        if(winnerAddress === oppAddress) {
            return "Opponent";
        }
    }

    let wager = window.web3.fromWei(props.game[5], 'ether');
    let unixTime = props.game[6];

    //converting unix time to mo/day/yr hr:time
    let date = props.timeConverter(unixTime);
    function handleGameConfirmation()  {
        props.handleConfirmGame(props.game[8]);
    }


    return(
        <tr>
            <th> {myAddress}</th>
            <td> {oppAddress}</td>
            <td> {winnerName()}</td>
            <td> {props.game[3]} to {props.game[4]}</td>
            <td> {wager}</td>
            <td> {date}</td>
            <td>  <Button color="success" type="button" onClick={handleGameConfirmation}>Confirm</Button>{' '}</td>
        </tr>
    )
}









export default IndividualGame

