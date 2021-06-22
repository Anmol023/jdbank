import React,{ Component } from "react";
import PolicyService from "../services/PolicyService";
import ManagePolicy from "./ManagePolicy";


class InsCmpny extends Component{
    constructor(props){
        super(props)
        this.state={
            policies:[],
            categories:[],
            policy:{
                name:'',
                premium:'',
                cover:'',
                claimSettled:'',
                image:'',
                categoryName:'',
                company:''
            },
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
        this.handleAdd = this.handleAdd.bind(this)
    }

    async componentDidMount(){
        const id = (JSON.parse(sessionStorage.getItem('user'))).insurer
        this.setState({policies: await PolicyService.getPoliciesByInsurerId(id), categories: await PolicyService.getAllCategories()})
        this.setState({policy:{...this.state.policy,company:`${id}`}})
        console.log(this.state.policy)
    }

    handleChange(event) {
        event.preventDefault();
        var policy=this.state.policy;
        var errors=this.state.errors;
        const {name,value} = event.target;
        policy[name]=value;
        switch(name) {
            case 'name':
                errors.name=value.length>3?'':'Name should have atleast 4 characters';
                break;
            case 'image':
                errors.image=value.length>0?'':'Image URL is required';
                break;
            case 'cover':
                errors.cover=value.length>0?'':'Cover is required';
                break;
            case 'claimSettled':
                errors.claimSettled=value.length>0?'':'%Claim Settled is required';
                break;
            case 'premium':
                errors.premium=value.length>0?'':'Invalid price';
                break;
            case 'categoryName':
                errors.categoryName=value.length>0?'':'Category Name is required';
                break;
        }
        this.setState({policy:policy, errors:errors})
    }
    
    async handleAdd(event) {
        event.preventDefault()
        var policy=this.state.policy
        var errors=this.state.errors
        let flag=0;
        Object.keys(policy).forEach(key=>{
            errors[key]=policy[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag++;
        });
        if(flag===0) {
            await PolicyService.addPolicy(this.state.policy)
            window.location.reload(false)
        }
        else
        this.setState({errors:errors})
    }
    
    render() {
        const policies=this.state.policies;
        return (
            <div>
                <div className="row mb-3">
                    <span className="ml-5">
                        <h4>Policies</h4>
                    </span>
                    <span className="float-right ml-auto mr-5 pointer"  data-toggle="collapse" data-target="#add-policy">
                        <i className="material-icons">playlist_add</i> Add
                    </span>
                </div>
                <ul className="list-group">
                    <li id="add-policy" className="list-group-item list-group-item-action collapse justify-content-between mt-1">
                        <form>
                            <div className="form-group">
                                <h5>Add New policy</h5>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Policy Name</label>
                                    <input className="form-control" type="text" name="name" placeholder="Enter policy Name" onChange={this.handleChange}/>
                                    {this.state.errors.name.length>0 && <small className='text-danger'>{this.state.errors.name}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Image URL</label>
                                    <input className="form-control" type="text" name="image" placeholder="Enter Image URL" onChange={this.handleChange}/>
                                    {this.state.errors.image.length>0 && <small className='text-danger'>{this.state.errors.image}</small>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Premium</label>
                                    <input className="form-control" type="text" name="premium" placeholder="Enter Premium" onChange={this.handleChange}/>
                                    {this.state.errors.premium.length>0 && <small className='text-danger'>{this.state.errors.premium}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Cover</label>
                                    <input className="form-control" type="text" name="cover" placeholder="Enter Cover" onChange={this.handleChange}/>
                                    {this.state.errors.cover.length>0 && <small className='text-danger'>{this.state.errors.cover}</small>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 my-2">
                                    <label>Claim Settled</label>
                                    <input className="form-control" type="text" name="claimSettled" placeholder="Enter Claim Settled" onChange={this.handleChange}/>
                                    {this.state.errors.claimSettled.length>0 && <small className='text-danger'>{this.state.errors.claimSettled}</small>}
                                </div>
                                <div className="col-12 col-md-6 my-2">
                                    <label>Category Name</label>
                                    <select className="form-control" name="categoryName" id="categoryName" onChange={this.handleChange}>
                                        <option className="font-italic" defaultValue="" selected={true} disabled={true}>Choose Category</option>
                                        {this.state.categories.map((category)=>(
                                            <option key={category.id} value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                    {this.state.errors.categoryName.length>0 && <small className='text-danger'>{this.state.errors.categoryName}</small>}
                                </div>
                            </div>
                            <div className="form-group my-2">
                                <button className="btn btn-info" onClick={this.handleAdd} data-toggle="collapse">Add</button>
                            </div>
                        </form>
                    </li>
                </ul>
                <div id="accordion1">
                    <ul className="list-group mb-5">
                        {policies.map(policy=>(
                            <ManagePolicy key={policy.id} policy={policy} categories={this.state.categories}/>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}

export default InsCmpny