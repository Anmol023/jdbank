import React from 'react'
import UserService from '../services/UserService'
import NotFound from '../site/not-found/NotFound'

class Sales extends React.Component {
     
    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null || JSON.parse(sessionStorage.getItem('user')).role!=='ROLE_AGENT')
        return (<NotFound/>)
        const sold=JSON.parse(sessionStorage.getItem('user')).totalSales
        return (
            <div className="container">
                {sold.total===0 && (
                    <div className="justify-content-center">
                        <div className="alert alert-warning border border-warning text-center my-5">
                            No items Sold yet ;)
                        </div>
                    </div>
                )}
                {sold.total>0 && (
                    <div className="row">
                        <div className="col-12">
                            <div className="container">
                                <div className="row">
                                    <div className="col my-auto text-center">
                                        <strong className="ml-5">Policy Name</strong>    
                                    </div>
                                    <div className="col my-auto text-center">
                                        <strong className="ml-5">CustomerId</strong>    
                                    </div>
                                    <div className="col my-auto text-center">
                                        <strong className="ml-5">Sales Date</strong>    
                                    </div>
                                    <div className="col my-auto text-center">
                                        <strong className="ml-5">Delete</strong>    
                                    </div>
                                </div>
                            </div>       
                            {sold.soldItems.map((item)=>(
                                <li className="list-group-item" data-toggle="tooltip" title="Click to view">
                                    <div className="container">
                                        <div className="row">
                                                <div className="col">
                                                    <h6 className="ml-5">{item.policy.name}</h6>
                                                </div>                                          
                                                <div className="col text-center">
                                                    <h6 className="ml-5">{item.customerId}</h6>
                                                </div>
                                                <div className="col text-center">
                                                    <h6 className="ml-5">{item.salesDate}</h6>
                                                </div>
                                            <div className="col my-auto p-1">
                                                <div className="pointer text-danger mr-5 p-2  pointer float-right" data-toggle="tooltip" title="Delete" >
                                                    <i className="material-icons">delete_forever</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Sales
