import React,{ Component } from "react";
import "./Policy.css";
import UserService from "../../services/UserService";
import { Button,Modal} from 'react-bootstrap'; 

export default class Policy extends Component{
    constructor(props){
        super(props)
        this.state={policyId:'',show:false, customerId:'', customerName:'',url:''}
        this.handleAddToSales= this.handleAddToSales.bind(this);
        this.handleChange= this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this)
    }

    async handleAddToSales(event){
        console.log(this.props.policy.id)
        const email = (JSON.parse(sessionStorage.getItem('user'))).email
        await UserService.addToSales(email,this.state.customerId, this.props.policy.id, this.state.customerName, this.state.url)
        this.handleModal()
        alert("Details Added")
    }
    handleModal(){  
        this.setState({show:!this.state.show})  
      } 

    handleChange= event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    async handleUpload(event){
        event.preventDefault()
        let file = event.target.files[0];
        const formdata = new FormData();
        formdata.append('file', file);
        var x = await UserService.fileUpload(formdata)
        var res = x.substring(52)
        this.setState({url:res})
    }
    render() {
        const policy=this.props.policy;
        return (
            <div>
            <div className="card mx-auto mb-5">
                <div className="embed-responsive embed-responsive-4by3">
                    <img className="card-img-top embed-responsive-item" src={policy.image} alt={policy.name}/>
                </div>
                <div className="card-body">
                    <div className="row height">
                        <div className="col-12 font-size-18 text-muted text-overflow">{policy.name}</div>
                    </div>
                    <div className="row">
                        <small className="col-12 font-size-14 text-muted text-truncate">{policy.categoryName}</small>
                    </div>
                    <div className="row my-2">
                        <div className="col-12">
                            <span className="text-danger font-size">₹{policy.premium}</span>
                        </div>
                    </div>
                    <button className="btn btn-info mt-2 w-100" onClick={()=>this.handleModal()}>
                        <i className="material-icons">add_circle</i>  <strong>ADD Sales</strong>
                    </button>
                </div>
            </div>
                <Modal show={this.state.show} onHide={()=>this.handleModal()}>  
                    <Modal.Header closeButton>Add Customer Details</Modal.Header>  
                    <Modal.Body>
                        <div className="form-group">
                            <label>Enter CustomerId:</label>
                            <input type="text" value={this.state.customerId} name="customerId" onChange={e => this.handleChange(e)} className="form-control"/><br/>
                            <label>Enter CustomerName:</label>
                            <input type="text" value={this.state.customerName} name="customerName" onChange={e => this.handleChange(e)} className="form-control"/><br/>
                            <label>Document:</label>
                            <input type="file" onChange={this.handleUpload}/>
                        </div>
                    </Modal.Body>  
                    <Modal.Footer>  
                        <Button onClick={()=>this.handleModal()}>Close</Button>  
                        <Button onClick={this.handleAddToSales}>Save</Button>  
                    </Modal.Footer>  
                </Modal>
            </div>
        )
    }
}