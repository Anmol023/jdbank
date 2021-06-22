import AuthService from './AuthService';

const URI = "http://localhost:8081";

class PolicyService{
    async getPolicyByCategory(categoryName){
        const response = await fetch(URI+`/policy/${categoryName}`)
        var policies = []
        if (response.status===200)
            policies = await response.json()
        else{
            alert("Cannot fetch. Please refresh.")
            window.location.reload(false)
        }
        return policies;
    }
    async getAllPolicies(){
        const response = await fetch(URI+`/policy`);
        if(response.status===200)
        return await response.json()
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async getPoliciesByInsurerId(id){
        const response = await fetch(URI+`/policy/inscmpny/${id}`)
        var policies = []
        if(response.status === 200)
            policies = await response.json()
        else{
            alert("Cannot fetch. Please Refresh")
        }
        return policies
    }

    async getAllCategories(){
        const response = await fetch(URI+`/category`)
        if(response.status===200)
        return await response.json()
        else{
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async updatePolicy(policy) {
        const response=await fetch(URI+'/policy', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(policy)
        })
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.reload(false)
        }
    }
    async deletePolicy(id) {
        const response=await fetch(URI+`/policy/${id}`, {
            method:'DELETE'
        })
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async addPolicy(policy) {
        const response=await fetch(URI+'/policy', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(policy)
        })
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }
    
}

export default new PolicyService();