import { Component } from 'react';
import UserService from './UserService';

const API_URL="http://localhost:8080/";

class AuthService extends Component{

    constructor(props) {
        super(props)
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
    }

    async signup(user) {
        const response=await fetch(API_URL+'user/signup', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)});
        if(response.status!==200) {
            alert("Could not sign up. Please try again.")
            window.location.reload(false)
        }
    }
    
    async login(email, password) {
        const response=await fetch(API_URL+"authenticate",{
            method:'GET',
            headers:{
                'Authorization':'Basic '+btoa(`${email}:${password}`)
            }
        });
        if(response.status===200) {
            const auth=await response.text()
            const res = auth.split(" ")
            sessionStorage.setItem('auth',res[0])
            await UserService.getUser(email)
            switch(res[1]) {
                case 'ROLE_AGENT':
                    window.location.replace("/agent");
                    break;
                case 'ROLE_ADMIN':
                    window.location.replace("/admin");
                    break;
                case 'ROLE_INSCMPNY':
                    window.location.replace("/inscmpny")
                    break;
                default:
                    window.location.replace("/");
                    break;
            }
        }
        else {
            alert("Invalid email/Password")
            window.location.replace('/login')
        }
    }

    logout() {
        sessionStorage.setItem('user',JSON.stringify(null));
        sessionStorage.setItem('auth',JSON.stringify(null));
        fetch(API_URL+'logout')
    }

}

export default new AuthService();
