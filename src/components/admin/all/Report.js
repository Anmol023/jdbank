import React from "react"
import {CSVLink} from 'react-csv';
class Report extends React.Component{
    constructor(props){
        super(props)
        this.state={
            agent:this.props.agent,
        }
    }

    render(){
        const agent = this.state.agent
        const row = agent.totalSales.total
        var names=[],customerIds=[],salesDates=[]
        var x = Array.from(Array(row+1), () => new Array());
        x[0].push("Policy Name","Customer Name","Customer Id","Document Url","Date of Sales")
        for(var i=0; i< row;i++){
            names.push(<div className="col-6 col-sm-12 my-auto">{agent.totalSales.soldItems[i].policy.name}</div>)
            customerIds.push(<div className="col-6 col-sm-12 my-auto">{agent.totalSales.soldItems[i].customerId}</div>)
            salesDates.push(<div className="col-6 col-sm-12 my-auto">{agent.totalSales.soldItems[i].salesDate}</div>)
            x[i+1].push(agent.totalSales.soldItems[i].policy.name,agent.totalSales.soldItems[i].customerName,agent.totalSales.soldItems[i].customerId,agent.totalSales.soldItems[i].documentUrl,agent.totalSales.soldItems[i].salesDate)
        }
        console.log(x)
        return(
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
                                <div className="col-6 col-sm-12 my-auto"><b>Policy Name</b></div>
                                {names}
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                        <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>CustomerId</b></div>
                            {customerIds}
                        </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="row my-2">
                            <div className="col-6 col-sm-12 my-auto"><b>Sales Date</b></div>
                            {salesDates}
                        </div>
                        </div>
                    </div>
                    <div className="row float-right">
                        <CSVLink data={x} filename={"sales.csv"}className="btn btn-info">Download</CSVLink>
                    </div>
                </div>
                
            </li>
        )
    }

}

export default Report