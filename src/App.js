import React, { Component } from 'react';
import { Router, Link } from "@reach/router";
import UserLanding from './components/UserLanding';
import LiveGame from './components/LiveGame';
import Profile from './components/Profile';
import Leaderboard from './components/Leaderboard';
import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
} from 'reactstrap';
import './App.css';
// import { default as Web3} from 'web3'

class App extends Component {
  constructor (props) {
    super (props);

    const CryptoPongHero = window.web3.eth.contract ([
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "name": "playerGameCount",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "users",
        "outputs": [
          {
            "name": "id",
            "type": "address"
          },
          {
            "name": "userName",
            "type": "string"
          },
          {
            "name": "wins",
            "type": "uint32"
          },
          {
            "name": "losses",
            "type": "uint32"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "gamesPlayed",
        "outputs": [
          {
            "name": "creator",
            "type": "address"
          },
          {
            "name": "opponent",
            "type": "address"
          },
          {
            "name": "winner",
            "type": "address"
          },
          {
            "name": "op1Score",
            "type": "uint8"
          },
          {
            "name": "op2Score",
            "type": "uint8"
          },
          {
            "name": "wager",
            "type": "uint256"
          },
          {
            "name": "timeStamp",
            "type": "uint256"
          },
          {
            "name": "complete",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "gameToAwayPlayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_gameId",
            "type": "uint256"
          }
        ],
        "name": "_confirmGame",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "userIdToAddress",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_walletAddress",
            "type": "address"
          },
          {
            "name": "_userName",
            "type": "string"
          }
        ],
        "name": "_createUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "gameToHomePlayer",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "_getTotalGameNumber",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_cr",
            "type": "address"
          },
          {
            "name": "_opp",
            "type": "address"
          },
          {
            "name": "_winner",
            "type": "address"
          },
          {
            "name": "_crScore",
            "type": "uint8"
          },
          {
            "name": "_oppScore",
            "type": "uint8"
          },
          {
            "name": "_wager",
            "type": "uint256"
          },
          {
            "name": "_time",
            "type": "uint256"
          }
        ],
        "name": "_finish",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      }
    ]);

    this.state = {
      ContractInstance: CryptoPongHero.at ('0x78318B219D0B3a608E9ad0F5Af5AC5dF5b9dE635'),
      userName: "",
      creatorWalletAddress: "loading...",
      oppWalletAddress: "",
      winner: "",
      creatorScore: 0,
      oppScore: 0,
      wager: 2,
      allGames: [],
      gameCount: 0,
      confirmedGames: []

    }

    this.createUser = this.createUser.bind (this);
    this.callUser = this.callUser.bind (this);
    this.setOppWalletAddress = this.setOppWalletAddress.bind (this);
    this.setWager = this.setWager.bind (this);
    this.getTotalGameNumber = this.getTotalGameNumber.bind (this);
    this.submitGame = this.submitGame.bind (this);
    this.setOppScore = this.setOppScore.bind (this);
    this.setCreatorScore = this.setCreatorScore.bind (this);
    this.declareCreatorWinner = this.declareCreatorWinner.bind (this);
    this.declareOpponentWinner = this.declareOpponentWinner.bind (this);
    this.getPlayerGameCount = this.getPlayerGameCount.bind (this);
    this.handleTotalGameNumber = this.handleTotalGameNumber.bind(this);
    this.getFullGamesHistory = this.getFullGamesHistory.bind (this);
    this.handleRawGamesHistory = this.handleRawGamesHistory.bind (this);
    this.confirmGame = this.confirmGame.bind (this);
    this.handleConfirmGame = this.handleConfirmGame.bind (this);
    this.countWinsLossesTotal = this.countWinsLossesTotal.bind (this);
    this.getAllConfirmedGames = this.getAllConfirmedGames.bind (this);
    this.checkForAddress = this.checkForAddress.bind (this);
  }

  componentWillMount() {
    // this.checkForAddress()
    this.handleTotalGameNumber()
  }

  componentDidMount() {
    // this.delay(500).then(() => { 
    //   console.log('done');
    //   this.handleRawGamesHistory()
    // })
    this.checkForAddress()
  }

  componentDidUpdate()  {
    // if (this.state.creatorWalletAddress !== undefined)  {
    //   clearInterval(setInterval)
    // }
  }

  checkForAddress() {
    var timerid = setInterval(function()  {
      // console.log("window.web3.eth is: ", window.web3.eth)
      console.log(window.web3.eth.accounts[0]);
      if(window.web3.eth.accounts[0]) {

        this.setState({creatorWalletAddress: window.web3.eth.accounts[0]});
        this.handleTotalGameNumber()
        this.handleRawGamesHistory()
        clearInterval(timerid);
      }
    }.bind(this), 1000)
  }


  delay(millisecs) {
    return new Promise(resolve => {
      setTimeout(() => resolve(millisecs), millisecs)
    })
  }
  //works
  createUser (event)   {
    event.preventDefault();

    const { _createUser } = this.state.ContractInstance;
    const {userName: newState} = this.state;

    _createUser(
      window.web3.eth.accounts[0],
      newState,
      (err, result) =>  {
        console.log("user is being added to blockchain");
      } 
    )
  }

  //works
  callUser()  {
    const {users} = this.state.ContractInstance;
    users(
      0,
      (err, result) =>  {
      console.log("user 0 information: " + JSON.stringify(result));
    });
  }

  
  //works - make sure address has loaded
  getPlayerGameCount() {
    const { playerGameCount } = this.state.ContractInstance;
    
    playerGameCount(
      this.state.creatorWalletAddress,
      (err, result) =>  {
        // console.log("player game count is:" + JSON.stringify(result));
    });
  }
  
  //works
  getTotalGameNumber() {
    const { _getTotalGameNumber } = this.state.ContractInstance;

    return new Promise((resolve, reject) => {
      _getTotalGameNumber(
      (err, result) =>  {
        if (err) return reject(err);
        // console.log("Total Game Number is: " + JSON.stringify(result));
        resolve(result);
      });
    });
  }

  // let gameId = Number(JSON.stringify(props.gameId).substring(1,JSON.stringify(props.gameId).length - 1))

  handleTotalGameNumber() {
    this.getTotalGameNumber()
    .then(count => {
      let newCount = parseInt(JSON.stringify(count).substring(1,JSON.stringify(count).length - 1))
      this.setState({gameCount: newCount});
    })
  }
  
  //works
  getFullGamesHistory(int) {
    const { gamesPlayed } = this.state.ContractInstance;
    
    return new Promise((resolve, reject) => {
      gamesPlayed(
        int,
        (err, result) =>  {
          if (err) return reject(err);
          // console.log("game information for game " + int + " is: " + JSON.stringify(result));
          resolve(result);
      });
    })
  }
  
  handleRawGamesHistory()  {
    this.setState({
      allGames: []
    })
    for(let i=0; i<this.state.gameCount; i++)  {
      this.getFullGamesHistory(i)
      .then(result => {
        let newArray = this.state.allGames;
        let info = result

        let creatorAddress = (info[0].substring(0,info[0].length));
        let opponentAddress = (info[1].substring(0,info[1].length));
        let winnerAddress = (info[2].substring(0,info[2].length -1));
        let creatorScore = (Number(JSON.stringify(info[3]).substring(1,JSON.stringify(info[3]).length - 1)));
        let opponentScore = (Number(JSON.stringify(info[4]).substring(1,JSON.stringify(info[4]).length - 1)));
        //wager in Wei
        let wager = (Number(JSON.stringify(info[5]).substring(1,JSON.stringify(info[5]).length - 1)));
        let unixTime = (Number(JSON.stringify(info[6]).substring(1,JSON.stringify(info[6]).length - 1)));
        //game confirmation bool
        let gameConfirmed = (info[7]);
        //gameId - order of game in contract mapping
        let gameId = (i);
        newArray.push([creatorAddress, opponentAddress, winnerAddress, creatorScore, opponentScore, wager, unixTime, gameConfirmed, gameId]);
        this.setState({
          allGames: newArray
        })
      })
    }
  }

  //works
  submitGame(event)  {
    event.preventDefault();
    const { _finish } = this.state.ContractInstance;

    let wagerPaid = this.state.wager;
    if (this.state.creatorWalletAddress === this.state.winner)  {
        wagerPaid = 0;
    }
    let weiWager = this.state.wager*Math.pow(10, 18)
    console.log("weiWager is (sending this currently): ", weiWager)
    console.log("wagerPaid is: ", wagerPaid)
    console.log("window.web3.toWei(wagerPaid)", window.web3.toWei(wagerPaid, 'ether'))

    _finish(
      this.state.creatorWalletAddress,
      this.state.oppWalletAddress,
      this.state.winner,
      this.state.creatorScore,
      this.state.oppScore,
      weiWager,
      Date.now(),
      {
        gas: 3000000,
        from: window.web3.eth.accounts[0],
        value: window.web3.toWei(wagerPaid, 'ether')
        //code below is for trying to handle sending wagers in decimals.  not sure if the acutal send (below) or the 
        //this.state.wager param in _finish (above) is causing the failed transaction.  likely its _finish b/c solidity code probs cant receive decimal
        //
        // value: window.web3.fromWei (this.state.wager*10^18, 'ether')
      },
      (err, result) =>  {
        // console.log("game is being submitted to the blockchain" + JSON.stringify(result));
      }
    );
  }

  confirmGame(int) {
    const { _confirmGame } = this.state.ContractInstance;
    let activeGameNumber = 0;
    for(let i=0; i<this.state.gameCount; i++) {
      if(this.state.allGames[i][8] === int) {
        activeGameNumber = i;
      }
    }

    let dueWager = 0
    let currentWager = parseInt(JSON.stringify(this.state.allGames[activeGameNumber][5]).substring(1,JSON.stringify(this.state.allGames[activeGameNumber][5]).length - 1));
    let gameWinner = JSON.stringify(this.state.allGames[activeGameNumber][2]).substring(1, JSON.stringify(this.state.allGames[activeGameNumber][2]).length -1 )
    if(gameWinner !== this.state.creatorWalletAddress) {
        dueWager = currentWager;
    }
    console.log("due wager, currentWager, gameWinner, me", dueWager, currentWager, gameWinner, this.state.creatorWalletAddress)
    console.log("most current allGames is: ", this.state.allGames )
    console.log("sending gameId: " + int + "and wager/gamewinner of allGames index: " + activeGameNumber)
    return new Promise((resolve, reject) => {
      _confirmGame(
        int,
        {
          gas: 3000000,
          from: this.state.creatorWalletAddress,
          value: dueWager
        },
        (err, result) =>  {
          if (err) return reject(err);
          console.log("confirmGame result for game " + int + " is: " + JSON.stringify(result));
          console.log("error from _confirmGame is: ", err)
          resolve(result);
        });
    })
  }
  handleConfirmGame(int)  {
    // console.log("gameId coming in is: ", int)
    let activeGameNumber = 0;
    for(let i=0; i<this.state.gameCount; i++) {
      if(this.state.allGames[i][8] === int) {
        activeGameNumber = i;
      }
    }
    // console.log("active game number going to change state to true is: ", activeGameNumber)
    // console.log("because activegame number has gameId: ", this.state.allGames[activeGameNumber][8]);

    let newArr = this.state.allGames
    newArr[activeGameNumber][7] = true
    this.setState({
      allGames: newArr
    })
    this.confirmGame(int).then((result) =>  {
      console.log(result);
    })
  }

  countWinsLossesTotal(address) {
    let confirmedGamesArray = this.getAllConfirmedGames()
    console.log("confirmedGamesArray is: ", confirmedGamesArray)
    let wins = 0;
    let losses = 0;
    let total = 0;
    for (let i=0; i<confirmedGamesArray.length; i++)  {
      if (confirmedGamesArray[i][2] === address) {
        wins++;
        total++;
      }
      if (((confirmedGamesArray[i][0] || confirmedGamesArray[i][1]) === address) && confirmedGamesArray[i][2] !== address) {
        losses++;
        total++;
      }
    }
    return [wins, losses, total];
  }

  getAllConfirmedGames()  {
    let confirmedGamesArray = [];
    for (let i=0; i<this.state.allGames.length; i++)  {
      if (this.state.allGames[i][7] === true) {
        confirmedGamesArray.push(this.state.allGames[i])
      }
    }
    return confirmedGamesArray;
  }
  
  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var year = a.getFullYear();
    var shortYear = Number(JSON.stringify(year).substring(2,4))
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + '/' + date + '/' + shortYear + ' ' + hour + ':' + min;
    return time;
  }
  
  
  setOppWalletAddress(address) {
    this.setState({
      oppWalletAddress: address 
    })
  }
  setWager(int) {
    this.setState({
      wager: int 
    })
  }
  setOppScore(int) {
    this.setState({
      oppScore: int 
    })
  }
  setCreatorScore(int)  {
    this.setState({
      creatorScore: int 
    })
  }
  declareCreatorWinner(address)  {
    console.log("address sent to creatorWinner in appjs is: ", address)
    this.setState({
      winner: address
    })
    console.log("this.state.winner is:", this.state.winner)
  }
  declareOpponentWinner(address)  {
    console.log("address sent to oppwinner in appjs is: ", address)
    this.setState({
      winner: address
    });
    console.log("this.state.winner is:", this.state.winner)
  }
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> Crypto Pong Hero</h1>
        </header>
        <nav>
          <Breadcrumb>
            <BreadcrumbItem><Link to="leaderboard">LeaderBoard</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to="/profile">profile</Link></BreadcrumbItem>
            <BreadcrumbItem className="float-right">My Address: {this.state.creatorWalletAddress}</BreadcrumbItem>
          </Breadcrumb>
        </nav>
        <Container>
          <Router>
            <UserLanding  
              path="/"  
              myAddress={this.state.creatorWalletAddress}
              setOppWalletAddress={this.setOppWalletAddress}  
              setWager={this.setWager} 
              gameCount={this.state.gameCount}
              allGames={this.state.allGames}
              handleConfirmGame={this.handleConfirmGame}
              timeConverter={this.timeConverter}
            />
            <LiveGame 
              path="/game"  
              wager={this.state.wager}
              oppWalletAddress={this.state.oppWalletAddress} 
              myAddress={this.state.creatorWalletAddress}
              submitGame={this.submitGame}
              setOppScore={this.setOppScore}
              setCreatorScore={this.setCreatorScore} 
              declareCreatorWinner={this.declareCreatorWinner}
              declareOpponentWinner={this.declareOpponentWinner}
              winner={this.state.winner}
            />
            <Profile 
              path="/profile"
              myAddress={this.state.creatorWalletAddress}
              gameCount={this.state.gameCount}
              allGames={this.state.allGames}
              handleConfirmGame={this.handleConfirmGame}
              timeConverter={this.timeConverter}
              countWinsLossesTotal={this.countWinsLossesTotal}
            />
            <Leaderboard
              path="/leaderboard"
              getAllConfirmedGames={this.getAllConfirmedGames}
              countWinsLossesTotal={this.countWinsLossesTotal}
              myAddress={this.state.creatorWalletAddress}
            />
          </Router>
        </Container>
        <br />
        <br />
      </div>
    );
  }
}

export default App;





// 0x5ed8cee6b63b1c6afce3ad7c92f4fd7e1b8fad9f


