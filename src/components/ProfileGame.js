import React from 'react';



const ProfileGame = (props) => {

    let myAddress = props.myAddress.substring(0,5);

    //determine which address substring to place in opponet category
    function getOpponentAddress()  {
        let oppAddress = props.game[1]
        if(props.myAddress === props.game[1])   {
            oppAddress = props.game[0];
        }
        return oppAddress.substring(0,5);
    }

    //determine which who won
    let winnerAddress = props.game[2].substring(0,5);
    function winnerName()   {
        if(winnerAddress === myAddress) {
            return "Me";
        }
        if(winnerAddress === getOpponentAddress()) {
            return "Opponent";
        }
    }

    let crScore = props.game[3];
    let oppScore = props.game[4];

    // converting wager in wei to eth
    let weiWager = props.game[5];
    let wager = window.web3.fromWei(weiWager, 'ether');

    let time = props.game[6];
    let date = props.timeConverter(time);


    return(
        <tr>
            <td> {myAddress}</td>
            <td> {getOpponentAddress()}</td>
            <td> {winnerName()}</td>
            <td> {crScore} to {oppScore}</td>
            <td> {wager}</td>
            <td> {date}</td>
        </tr>

    )
}









export default ProfileGame

