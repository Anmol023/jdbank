import AuthService from './AuthService';

const URI="http://localhost:8080/user/"

class UserService {

    async getUser(email) {
        const response=await fetch(URI+`${email}`)
        if(response.status===200)
            sessionStorage.setItem('user',JSON.stringify(await response.json()))
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async updateUser() {
        const user=JSON.parse(sessionStorage.getItem('user'))
        const response=await fetch(URI+'customer',{
            method:'PUT', 
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('auth')
            },
            body:JSON.stringify(user)
        })
        if(response.status===200)
        return true
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async updatePassword(password) {
        const email=JSON.parse(sessionStorage.getItem('user')).email;
        const response=await fetch(URI+`user/${email}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+sessionStorage.getItem('auth')
            },
            body:JSON.stringify(password)
        })
        if(response.status===200)
        return await response.json()
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login') 
        }

    }

    

    async checkemail(email) {
        const response=await fetch(URI+`check/${email}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Cannot fetch. Please refresh.");
            window.location.reload(false);
        }
    }

    async addToSales(email, customerId, policyId, customerName, url){
        const response = await fetch(URI+`addPolicy/${email}/${policyId}/${customerId}/${customerName}/${url}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('auth')
            }
        });
        let json=null;
        if (response.status === 200)
            json=await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
            return false;
        }
        sessionStorage.setItem('user', JSON.stringify(json));
        return true;
    }
    async fileUpload(file){
        const response = await fetch(URI+`uploadFile`,{
            method: 'POST',
            body:file
        })
        var url = ''
        if (response.status===200){
            alert("Document uploaded")
            url = await response.text()
        }
        else
            alert("Upload Error")
        return url
    }

    async deleteSoldItem(email, id){
        const response = await fetch(URI+`deleteSold/${email}/${id}`,{
            method:'PUT',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('auth')
            }
        })
        if (response.status!==200)
            alert("Error in deleting")
        else
            alert("Deleted Succesfully")
    }
    
}   

export default new UserService();