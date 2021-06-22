import React from 'react';  
import { Jumbotron } from 'react-bootstrap';

class Home extends React.Component {
    render(){
        return(
            <Jumbotron>
                <h1>JD Bank Onboarding</h1>
                <ul>
                    <li>Agent Login</li>
                        <ul>
                            <li>Add and View Sales</li>
                        </ul><br/>
                    <li>Admin Login</li>
                        <ul>
                            <li>Verify and complete the Onboarding process</li>
                            <li>Generate report of Sales by Agents</li>
                        </ul><br/>
                    <li>Insurer Login</li>
                        <ul>
                            <li>Add and Edit the policies</li>
                        </ul>
                </ul>
            </Jumbotron>
        )
    }
}
export default Home;