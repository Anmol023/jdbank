import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService';

class Header extends Component{

    constructor(props) {
        super(props);
        this.handleLogout=this.handleLogout.bind(this);
        this.handleProfile=this.handleProfile.bind(this);
        this.handleChangePassword=this.handleChangePassword.bind(this);
        this.handleSalesHistory=this.handleSalesHistory.bind(this);
        this.handleVerified=this.handleVerified.bind(this);
    }

    async handleLogout(event){
        event.preventDefault();
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload(false)
    }

    handleVerified(event){
        event.preventDefault();
        this.props.history.push("/all")
    }

    handleProfile(event) {
        event.preventDefault();
        this.props.history.push("/profile")
    }

    handleChangePassword(event) {
        event.preventDefault();
        this.props.history.push("/change-password")
    }

    handleSalesHistory(event) {
        event.preventDefault();
        this.props.history.push("/my-sales")
    }

    render(){
        const user=JSON.parse(sessionStorage.getItem('user'))
        var path="/";
        if(user!=null) {
            switch(user.role) {
                case 'ROLE_ADMIN':
                    path="/admin";
                    break;
                case 'ROLE_INSCMPNY':
                    path="/inscmpny";
                    break;
                case 'ROLE_AGENT':
                    path="/agent";
            }
        }
        return(
            <div className="mb-4 header">
                <nav className="navbar header navbar-fixed-top navbar-light bg-info navbar-expand-sm">
                    <div className="nav-item">
                        <Link className="nav-link" to={path}>
                            <h3 style={{color: 'white', textDecoration: 'none'}}><i className="material-icons blockquote my-1">account_balance</i> JD Bank</h3>
                        </Link>
                    </div>
                    <button className="navbar-toggler" data-toggle="collapse" data-target="#navcontent">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navcontent">
                        <ul className="navbar-nav ml-auto">
                            {user==null &&
                                <li className="nav-item">
                                    <Link className="nav-link text-light" to="/signup">Sign Up</Link>
                                </li>}
                            {user==null &&
                                (<li className="nav-item">
                                    <Link className="nav-link text-light" to="/login">Login</Link>
                                </li>)}
                            {user!=null && (
                                <li className="nav-item dropdown text-light">
                                    <a className="nav-link dropdown-toggle" role="button" id="dropdownMenuLink"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.name}
                                    </a>
                                    <div className ="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuLink">
                                        <button className="dropdown-item" onClick={this.handleChangePassword}>Change Password</button>
                                        {user.role==='ROLE_AGENT' && (<>
                                            <button className="dropdown-item" onClick={this.handleProfile}>My Profile</button>
                                            
                                            <div className="dropdown-divider"/>
                                            <button className="dropdown-item" onClick={this.handleSalesHistory}>My Sales</button>
                                        </>)}
                                        {user.role==='ROLE_ADMIN' && (<>
                                            <button className="dropdown-item" onClick={this.handleVerified}>Verified</button>
                                        </>)}
                                        
                                    </div>
                                </li>)}
                            {user!=null && (
                                <li className="nav-item">
                                    <div className="nav-link text-light" style={{cursor:'pointer'}} onClick={this.handleLogout}>Logout</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Header);