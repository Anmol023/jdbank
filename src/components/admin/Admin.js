import React from 'react';
import AdminService from '../services/AdminService';
import NotFound from '../site/not-found/NotFound';
import './Admin.css';
import Verify from './verify/Verify';



export default class Admin extends React.Component{
    constructor() {
        super();
        this.state={
            agents : []
        }
    }

    async componentDidMount() {
        this.setState({agents:await AdminService.getAllAgent()})
        console.log(this.state.agents)
    }

    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null || JSON.parse(sessionStorage.getItem('user')).role!=='ROLE_ADMIN')
        return (<NotFound/>)
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <h3>Welcome Admin!</h3>
                </div>
                <div className="mb-4">
                    <hr/>
                </div>
                <div className="row mb-3">
                    <div className="col-12 col-sm-7 col-md-5 col-lg-4 text-center my-auto">
                        <h4>Verify Agents</h4>
                    </div>
                </div>
                
                <div id="accordion3">
                    <ul className="list-group mb-5">
                        {this.state.agents.length===0?
                        <div>
                            <hr/>
                            <li>
                                <div>No Agents Available</div>
                            </li>
                        </div>
                        :this.state.agents.map((agent)=>(
                            <Verify key={agent.userId} agent={agent}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}