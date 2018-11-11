import React from 'react';
import { Router, Link } from "@reach/router";


const CreateUser = (props) => {

    return(
        <div>
            <form className="job-form" onSubmit={this.createUser}>
                <label htmlFor="userName">User Name</label>
                <input type="text" name="userName" value={this.state.userName} onChange={event => this.setState({userName: event.target.value})}/>
                <input type="submit" name="submit" value="Submit" />
            </form>
        </div>
    )
}









export default CreateUser
