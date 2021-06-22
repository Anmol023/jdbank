import React from "react";
import AdminService from "../../services/AdminService";
import UserService from "../../services/AdminService";


class Verify extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            agent:this.props.agent,
            x:{
                email:'',
                body:'Congrats onboarding with JD bank successfull'
            }
        }
        this.handleDelete=this.handleDelete.bind(this)
        this.handleClick=this.handleClick.bind(this)

    }

    async handleDelete(event) {
        await UserService.deleteUser(this.state.agent.email)
        alert("Agent removed")
        window.location.reload(false)
    }

    async handleClick(event){
        var x = this.state.x
        x.email=this.state.agent.email
        await AdminService.sendEmail(x)
        await AdminService.addAgent(this.state.agent.email)
        alert("Agent Verified")
        window.location.reload(false)
        
    }

    render() {
        const agent=this.state.agent;
        return (
            <li className="list-group-item list-group-item-action pointer" data-toggle="tooltip" title="Click to view">
                <div className="row">
                  <div className="col-7 my-auto text-size"><strong className="ml-5">{agent.email}</strong></div>
                    <div className="col-5 my-auto p-1">
                        <div className="pointer text-danger mr-5 p-2 float-right pointer" data-toggle="tooltip" title="Delete" onClick={this.handleDelete}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div className="pointer text-success mr-5 p-2 float-right pointer" title="View Details" data-toggle="collapse" data-target={'#'+agent.userId}>
                            <b><i className="material-icons font-weight-bold">expand_more</i></b>
                        </div>
                    </div>
                </div>          
                <div id={agent.userId} className="collapse justify-content-between mt-1" data-parent="#accordion3">
                    <hr/>
                    <div className="row text-center">
                        <div className="col-12 col-sm-4">
                            <div className="row my-2">
                                <div className="col-6 col-sm-12 my-auto"><b>Name</b></div>
                                <div className="col-6 col-sm-12 my-auto">{agent.name}</div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Contact Number</b></div>
                            <div className="col-6 col-sm-12 my-auto">{agent.mob}</div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Ins Type</b></div>
                            <div className="col-6 col-sm-12 my-auto">{agent.insType}</div>
                        </div>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-12 col-sm-4">
                            <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>License Number</b></div>
                            <div className="col-6 col-sm-12 my-auto">{agent.license}</div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Distributor</b></div>
                            <div className="col-6 col-sm-12 my-auto">{agent.officeName}</div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Valid Till</b></div>
                            <div className="col-6 col-sm-12 my-auto">{agent.validTill}</div>
                        </div>
                        </div>
                    </div>
                    <div className="row float-right">
                        <div className="col-12 col-md-6 mb-2">
                            <button className="btn btn-info" onClick={this.handleClick}>Verify</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default Verify