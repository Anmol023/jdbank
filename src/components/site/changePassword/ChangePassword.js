import UserService from "../../services/UserService";


class ChangePassword extends Component {

    constructor(props) {
        super(props)
        this.state={
            user:JSON.parse(sessionStorage.getItem('user')).email,
            password:{oldPassword:'',newPassword:''},
            check:null,
            errors:{
                oldPassword:'',
                newPassword:''
            }
        }
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleChange(event) {
        event.preventDefault();
        var pwd=this.state.password
        var errors=this.state.errors
        const {name,value} = event.target
        pwd[name]=value
        if(name==='newPassword')
        errors.newPassword=pwd.newPassword.length<8?'Password should have atleast 8 characters':'';
        if(name==='oldPassword')
        errors.oldPassword=pwd.oldPassword.length>0?'':errors.oldPassword;
        this.setState({password:pwd, errors:errors})
    }

    async handleSubmit(event) {
        event.preventDefault();
        var pwd=this.state.password
        var errors=this.state.errors
        var flag=0;
        errors.oldPassword=pwd.oldPassword.length===0?'Current password required':'';
        errors.newPassword=pwd.newPassword.length===0?'New password required':errors.newPassword;
        Object.values(errors).forEach(value=>{
            if(value.length>0)
            flag++;
        })
        if(flag===0) {
        const response=await UserService.updatePassword(this.state.password);
        if(response===false)
        this.setState({check:false})
        else if(response===true)
        this.setState({check:true})
        }
        else
        this.setState({errors:errors})
    }

    render() {
        if(JSON.parse(sessionStorage.getItem('user'))===null)
        return (<NotFound/>)
        else
        return (
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-sm-12 col-md-8 col-lg-8 col-xl-6">
                        <div className="row ml-1 mb-3">
                            <h4>Update Password</h4>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    {this.state.check!==null && this.state.check===true && <div className="alert alert-success">
                                        Updated successfully
                                    </div>}
                                    {this.state.check!==null && this.state.check===false && <div className="alert alert-danger">
                                        Invalid Password
                                    </div>}
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input className="form-control" type="text" name="email" disabled={true} value={this.state.user}/>
                                    </div>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input className="form-control" type="password" placeholder="Enter current password" name="oldPassword" onChange={this.handleChange}/>
                                        {this.state.errors.oldPassword.length>0 && <small className="text-danger">{this.state.errors.oldPassword}</small>}
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input className="form-control" type="password" placeholder="Enter new password" name="newPassword" onChange={this.handleChange}/>
                                        {this.state.errors.newPassword.length>0 && <small className="text-danger">{this.state.errors.newPassword}</small>}
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-info" onClick={this.handleSubmit}>
                                            Update
                                        </button>
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

export default ChangePassword;