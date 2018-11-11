import React, { Component } from 'react';
import { Link } from "@reach/router";
import { Label, Input, Button} from 'reactstrap';

class CreateGame extends Component {
    constructor (props) {
        super (props);
    
        this.state = {
            myWalletAddress: this.props.myAddress,
            oppWalletAddress: "",
            wager: 0
        }
    }



    render() {
        return(
            <div className="createGames">
                <div className="createGamesChild">
                    <h3>Start A New Game!</h3>
                </div>
                <div className="createGamesChild">
                    <Label for="opponent">Opponent Wallet Address</Label>
                    <Input  id="opponent-input" name="opponent" placeholder="Example: 0x93ec3eebdd0ee8d4a0144316da27eca11a25fbee" onChange={event => this.props.setOppWalletAddress(event.target.value)} />
                </div>
                <div className="createGamesChild">
                    <Label for="wager">Wager Amount (eth)</Label>
                    <Input id="wager-input"  name="wager" placeholder="Ex: 0.03" onChange={event => this.props.setWager(event.target.value)} />
                </div>
                <div className="createGamesButton" >
                    <Link id={"link"} to="/game"><Button color="success" type="button" >Start Game</Button>{' '}</Link>
                </div>
            </div>
        )
    }
}

export default CreateGame