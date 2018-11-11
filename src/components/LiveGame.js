import React, { Component } from 'react';
import { Input, Label, Button} from 'reactstrap';


class LiveGame extends Component {

  constructor(props) {
    super(props)
    this.state = {
        showMyButton: false,
        showOppButton: false,
        showMeSubmit: false,
        showOppSubmit: false,
        myScore: 0,
        opponentScore: 0,

    }
    this.handleMyScore = this.handleMyScore.bind(this);
    this.handleOppScore = this.handleOppScore.bind(this);
    this.handleMeWinner = this.handleMeWinner.bind(this);
    this.handleOppWinner = this.handleOppWinner.bind(this);

  }

  handleMyScore(event) {
    this.props.setCreatorScore(event.target.value);
    this.setState({
      myScore: event.target.value
    })
    if (event.target.value === "21")  {
      this.setState({
        showMyButton: true
      })
    }
    if (event.target.value !== "21")  {
      this.setState({
        showMyButton: false,
        showMeSubmit: false
      })
      this.props.declareCreatorWinner("")
    }
  }

  handleOppScore(event) {
    // console.log("event: ", event)
    // console.log("event.target: ", event.target)
    this.props.setOppScore(event.target.value);
    this.setState({
      opponentScore: event.target.value
    })
    if (event.target.value === "21")  {
      this.setState({
        showOppButton: true
      })
    }
    if (event.target.value !== "21")  {
      this.setState({
        showOppButton: false,
        showOppSubmit: false,
      })
      this.props.declareOpponentWinner("")
    }
  }


  handleMeWinner(event) {
    event.preventDefault();
    let myAddress = this.props.myAddress
    this.props.declareCreatorWinner(myAddress);
      if (this.isAddress(this.props.myAddress)) {
      this.setState({
        showMeSubmit: true
      })
    }
  }

  handleOppWinner(event) {
    event.preventDefault();
    this.props.declareOpponentWinner(this.props.oppWalletAddress);
    if (this.isAddress(this.props.oppWalletAddress)) {
      this.setState({
        showOppSubmit: true
      })
    }
  }

  //not a great check - misses most things... web3.utils.isAddress('address') is supposed to work great but couldn't get web3 package installed
  isAddress(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
      // check if it has the basic requirements of an address
      return false;
    } else if (/^(0x)?[0-9a-f]{40}$/ || /^(0x)?[0-9A-F]{40}$/) {
      // If it's all small caps or all all caps, return true
      return true;
    } 
  };

  render() {
    return(
      <div className="liveGameComponent">
        <h3>Game Time</h3>
        <h5>Wager (eth): {this.props.wager}</h5>
        <div className="liveGame">
          
          <div className="leftOfGameTable">
            <div id="flex-opponent-child1">
              <h3>Opponent: </h3><h5>{this.props.oppWalletAddress}</h5>
            </div>
            <div id="flex-opponent-child2">
              Their Score:
              <Input id="opponent-score" type="text"  name="oppScore" value={this.state.opponentScore} onChange={this.handleOppScore} />
            </div>
            <div className="submitGameWinner">
              {this.state.showOppSubmit ? <h3> Winner! </h3>  : null}
              {this.state.showOppSubmit ? <Button color="primary" type="button" onClick={this.props.submitGame}>Submit Result</Button> : null}
            </div>
          </div>
          
          <div className="liveGameTable">
            <div id="flex-opponent">
                {this.state.showOppButton ? <Button  type="button" color="warning" onClick={this.handleOppWinner}>Opponent won</Button> : null}
            </div>
            <div id="flex-me">
                {this.state.showMyButton ? <Button color="success" type="button" onClick={this.handleMeWinner}>I won!</Button> : null}
            </div>
          </div>

          <div className="rightOfGameTable">
            <div id="flex-me-child1">
              <h3>Me: </h3><h5>{this.props.myAddress}</h5>
            </div>
            <div id="flex-me-child2">
              My Score:  
              <Input id="home-score" type="text" name="homeScore" value={this.state.myScore} onChange={this.handleMyScore} /> 
            </div>
            <div className="submitGameWinner">
              {this.state.showMeSubmit ? <h3> I Won! </h3>  : null}
              {this.state.showMeSubmit ? <Button color="primary" type="button" onClick={this.props.submitGame}>Submit Result</Button> : null}
            </div>
          </div>
          
        </div>
      </div> 
    )
  }
}


export default LiveGame