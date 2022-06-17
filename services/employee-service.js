import axiosInstance from "./index.js";

let instance = null;

class EmployeeService {
    constructor() {
        if(!instance) {
            instance = axiosInstance;
        }
    }

    
    requestEmployeeList() {
    	let url = 'graphql' ;
    	return instance.post(url, {
            query: `{
                employees {
                  id
                  name
                  code
                  phone_no
                  status
                }
              }`
        })
    }

    requestEmployeePagination(page, per_page) {
    	let url = 'graphql' ;
    	return instance.post(url, {
            query: `{
                employeesPagination(page: ${page}, per_page: ${per_page}) {
                    data { 
                        id 
                        name 
                        code 
                        phone_no 
                        status 
                    }
                    total
                    per_page
                }
            }`
        })
    }

    requestEmployeeById(id) {
    	let url = 'graphql';
        return instance.post(url, {
            query: `{
                employees(id:"${id}") {
                    id name code phone_no status
                }
            }`
        })
    }

    requestEmployeeCreate(params) {
        let url = 'graphql';
        return instance.post(url, {
            query: `
                mutation {
                    createEmployee (
                        name: "${params.name}",
                        code: "${params.code}",
                        phone_no: "${params.phone_no}",
                        status: "${params.status == 'Active' ? 1 : 0}",
                    ) { id }
            }`
        })
    }

    requestEmployeeUpdate(params) {
        let url = 'graphql';
        return instance.post(url, {
            query: `
                mutation {
                    updateEmployee (
                        id:"${params.id}",
                        name: "${params.name}",
                        code: "${params.code}",
                        phone_no: "${params.phone_no}",
                        status: "${params.status == 'Active' ? 1 : 0}"
                    ) { id }
            }`
        })
    }

    requestEmployeeDelete(id) {
        let url = 'graphql';
        return instance.post(url, {
            query: `
                mutation {
                    deleteEmployee (id: "${id}")
            }`
        })
    }
}

export default EmployeeService;