import AuthService from "./AuthService";

const URI="http://localhost:8080/admin/";

class AdminService{
    async getAllAgent() {
        const response=await fetch(URI+"allUnverifiedAgent", {
            headers: {
                'Authorization':'Bearer '+sessionStorage.getItem('auth')
            }
        });
        if(response.status===200)
        return await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }
    async getAllAgents(){
        const response = await fetch(URI+"allVerifiedAgent",{
            header:{
                'Authorization':'Bearer '+sessionStorage.getItem('auth')
            }
        })
        if(response.status===200)
        return await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async deleteUser(email) {
        const response = await fetch(URI+`${email}`, {
            method:'DELETE',
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('auth')
            }
        });
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async addAgent(email) {
        const response=await fetch(URI+`verify/${email}`, {
            method:'GET',
            headers:{
                'Authorization':'Bearer '+sessionStorage.getItem('auth')
            }
        })
        if(response.status!==200){ 
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async sendEmail(email){
        const response = await fetch("http://localhost:8080/email",{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
        },body:JSON.stringify(email)
        })
    }


}

export default new AdminService();