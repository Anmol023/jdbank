import React, { Component } from 'react';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state={
            user:{
                email:'',
                name:'',
                dob:'',
                mob:'',
                password:'',
                license:''
            },
            password2:'',
            errors:{
                email:'',
                name:'',
                dob:'',
                mob:'',
                password:'',
                license:'',
                password2:''
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handlePassword=this.handlePassword.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    async handleChange(event) {
        var user=this.state.user;
        var errors=this.state.errors;
        const {name,value}=event.target;
        user[name]=value;
        switch(name) {
            case 'email':
                errors.email=value.length<5?'Email should have atleast 5 characters':'';
                errors.email=value.length>4 && await UserService.checkemail(value)?'email already exists':errors.email;
                break;
            case 'name':
                errors.name=value.length>0?'':'name is required';
                break;
            case 'dob':
                errors.dob=value.length>0?'':'Date of birth is required';
                break;
            case 'license':
                errors.license=value.length>0?'':'License is required';
                break;
            case 'mob':
                errors.mob=isNaN(value)||value.length!==10?'Invalid mob number':'';
                break;
            case 'password':
                errors.password=value.length<8?'Password should have atleast 8 characters':'';
                break;
        }
        this.setState({user:user, errors:errors});
    }

    handlePassword(event) {
        event.preventDefault();
        const value=event.target.value;
        var errors=this.state.errors;
        errors.password2=value===this.state.user.password?'':'Passwords do not match';
        this.setState({password2:value,errors:errors})
    }

    async handleSubmit(event){
        event.preventDefault();
        var errors=this.state.errors;
        const user=this.state.user;
        let flag=0;
        Object.keys(user).forEach(key=>{
            errors[key]=user[key].length>0?'':key.charAt(0).toUpperCase()+key.slice(1)+' is required';
        })
        errors.password2=this.state.password2.length>0?'':'Retype password';
        Object.values(errors).forEach(value => {
            if(value.length>0)
                flag=1;
        });
        if(flag===0) {
            await AuthService.signup(user)
            alert("Verify email and wait for Confirmation")
            this.props.history.push('/login');
        }
        else
        this.setState({errors:errors})
    }

    render(){
        var date= new Date().toLocaleDateString;
        return(
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-10 col-lg-8 col-xl-6">
                        <div className="row ml-1 mb-3">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <form>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="email">Email ID</label>
                                            <input className="form-control" type="text" name="email" placeholder="Enter the email" onChange={this.handleChange}></input>
                                            {this.state.errors.email.length>0 && <small className="text-danger">{this.state.errors.email}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="name">Name</label>
                                            <input className="form-control" type="text" name="name" placeholder="Enter Your Name" onChange={this.handleChange}></input>
                                            {this.state.errors.name.length>0 && <small className="text-danger">{this.state.errors.firstName}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="dob">Date of Birth</label>
                                            <input className="form-control" type="date" name="dob" max={date} onChange={this.handleChange}></input>
                                            {this.state.errors.dob.length>0 && <small className="text-danger">{this.state.errors.dob}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="mob">Contact Number</label>
                                            <input className="form-control" type="text" name="mob" placeholder="Enter mob Number" onChange={this.handleChange}></input>
                                            {this.state.errors.mob.length>0 && <small className="text-danger">{this.state.errors.mob}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12">
                                            <label for="license">License Number</label>
                                            <input className="form-control" type="text" name="license" placeholder="Enter the license" onChange={this.handleChange}></input>
                                            {this.state.errors.license.length>0 && <small className="text-danger">{this.state.errors.email}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <label for="password">Password</label>
                                            <input className="form-control" type="password" name="password" placeholder="Enter Password" onChange={this.handleChange}></input>
                                            {this.state.errors.password.length>0 && <small className="text-danger">{this.state.errors.password}</small>}
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label for="confirmPassword">Confirm Password</label>
                                            <input className="form-control" type="password" name="password2" placeholder="Retype Password" onChange={this.handlePassword}></input>
                                            {this.state.errors.password2.length>0 && <small className="text-danger">{this.state.errors.password2}</small>}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 col-md-6">
                                            <button className="btn btn-info" onClick={this.handleSubmit}>Sign Up</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;