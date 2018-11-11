import React from 'react';



const PlayerRank = (props) => {
    
    function isMe() {
        let address = props.user[0];
        if (props.myAddress === address)    {
            address = "Me";
        }
        return address;
    }

    // console.log("key is: ", props.key)
    let rank = props.i + 1;
    return(
        <tr>
            
            <td>{rank}</td>
            <td>{isMe()}</td>
            <td>{props.user[1]}</td>
            <td>{props.user[2]}</td>
            <td>{props.user[3]}</td>
            <td>{props.user[4]}</td>
        </tr>

    )
}









export default PlayerRank

