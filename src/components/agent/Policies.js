import React, { Component } from "react";
import PolicyService from "../services/PolicyService";
import Policy from './policy/Policy'
export default class Policies extends Component{
    state={policies:[]}

    async componentDidMount(){
        const category = (JSON.parse(sessionStorage.getItem('user'))).insType
        this.setState({policies:await PolicyService.getPolicyByCategory(category)})
        console.log(this.state.policies)
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    {this.state.policies.map((policy)=>(
                        <div key={policy.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                            <Policy key={policy.id} policy={policy} history={this.props.history}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}