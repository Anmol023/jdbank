import React,{ Component } from "react"
import PolicyService from "../services/PolicyService"

class ManagePolicy extends Component{
    constructor(props) {
        super(props)
        this.state={
            policy:this.props.policy,
            categories:this.props.categories,
            errors:{
                name:'',
                premium:'',
                cover:'',
                claimSettled:'',
                image:'',
                categoryName:''
            }
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleUpdate=this.handleUpdate.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }
    
    handleChange(event) {
        event.preventDefault();
        var policy=this.state.policy;
        var errors=this.state.errors;
        const {name,value} = event.target;
        policy[name]=value;
        switch(name) {
            case 'name':
                errors.name=value.length>3?'':'Name should have atleast 3 characters';
                break;
            case 'image':
                errors.image=value.length>0?'':'Image URL is required';
                break;
            case 'cover':
                errors.cover=value.length>0?'':'Brand is required';
                break;
            case 'claimSettled':
                errors.claimSettled=value.length>0?'':'Manufacturer is required';
                break;
            case 'premium':
                errors.premium=value.length>0?'':'Invalid premium';
                break;
            case 'categoryName':
                errors.categoryName=value.length>0?'':'Category Name is required';
                break;
        }
        this.setState({policy:policy, errors:errors})
    }

    async handleUpdate(event) {
        event.preventDefault();
        var errors=this.state.errors
        let flag=0;
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            await PolicyService.updatePolicy(this.state.policy)
            window.location.reload(false)
        }
        else
        this.setState({errors:errors})
    }

    async handleDelete(event) {
        event.preventDefault();
        await PolicyService.deletePolicy(this.state.policy.id)
        window.location.reload(false)
    }

    render(){
        const policy=this.props.policy;
        return (
            <li className="list-group-item list-group-item-action">
                <div className="row">
                    <div className="col-4 col-sm-3 col-md-2 col-xl-1 text-center my-auto">
                        <img className="img-fluid pic-size" src={policy.image} alt={policy.name}/>
                    </div>
                    <div className="col-5 col-sm-6 col-md-6 col-xl-7 my-auto">
                        <strong className="text-size">{policy.name}</strong>
                    </div>
                    <div className="col-3 col-sm-3 col-md-4 my-auto">
                        <div className="text-danger float-right mx-3 pointer p-2" data-toggle="tooltip" data-placement="top" title="Delete" onClick={this.handleDelete}>
                            <i className="material-icons">delete_forever</i>
                        </div>
                        <div className="text-primary float-right mx-3 pointer p-2" data-toggle="tooltip" data-placement="top" title="Edit" data-toggle="collapse" data-target={'#'+policy.id}>
                            <i className="material-icons">edit</i>
                        </div>
                    </div>
                </div>
                <div id={policy.id} className="collapse justify-content-between mt-1" data-parent="#accordion1">
                    <hr/>
                    <form>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Policy Name</label>
                                <input className="form-control" type="text" value={policy.name} name="name" onChange={this.handleChange}/>
                                {this.state.errors.name.length>0 && <small className="text-danger">{this.state.errors.name}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Image URL</label>
                                <input className="form-control" type="text" value={policy.image} name="image" onChange={this.handleChange}/>
                                {this.state.errors.image.length>0 && <small className="text-danger">{this.state.errors.image}</small>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Cover</label>
                                <input className="form-control" type="text" value={policy.cover} name="cover" onChange={this.handleChange}/>
                                {this.state.errors.cover.length>0 && <small className="text-danger">{this.state.errors.cover}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Claim Settled</label>
                                <input className="form-control" type="text" value={policy.claimSettled} name="claimSettled" onChange={this.handleChange}/>
                                {this.state.errors.claimSettled.length>0 && <small className="text-danger">{this.state.errors.claimSettled}</small>}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 my-2">
                                <label>Premium</label>
                                <input className="form-control" type="text" value={policy.premium} name="premium" onChange={this.handleChange}/>
                                {this.state.errors.premium.length>0 && <small className="text-danger">{this.state.errors.premium}</small>}
                            </div>
                            <div className="col-12 col-md-6 my-2">
                                <label>Category Name</label>
                                <select className="form-control" name="categoryName" id="categoryName" defaultValue={policy.categoryName} onChange={this.handleChange}>
                                    {this.state.categories.map((category)=>(
                                        <option key={category.id} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                                {this.state.errors.categoryName.length>0 && <small className="text-danger">{this.state.errors.categoryName}</small>}
                            </div>
                        </div>
                        <div className="form-group my-2">
                            <button className="btn btn-info" onClick={this.handleUpdate}>Update</button>
                        </div>
                    </form>
                </div>
            </li>
        )
    }
}

export default ManagePolicy