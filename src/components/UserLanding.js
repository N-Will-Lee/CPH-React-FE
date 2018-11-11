import React from 'react';
import CreateGame from './CreateGame';
import ConfirmGames from './ConfirmGames';
import { Router, Link } from "@reach/router";
import { render } from "react-dom";
import LiveGame from './LiveGame';



const UserLanding = (props) => {

    return(
        <div>
            <br/>
                <CreateGame 
                    myAddress={props.myAddress} 
                    setOppWalletAddress={props.setOppWalletAddress} 
                    setWager={props.setWager}
                />
                <ConfirmGames 
                    myAddress={props.myAddress} 
                    // getAllGamesOfAddress={props.getAllGamesOfAddress}
                    gameCount={props.gameCount}
                    allGames={props.allGames}
                    handleConfirmGame={props.handleConfirmGame}
                    timeConverter={props.timeConverter}
                    // gameCount={props.gameCount}
                />
        </div>
    )
}









export default UserLanding