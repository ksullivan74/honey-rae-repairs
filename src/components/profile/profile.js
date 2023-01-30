import {EmployeeForm} from "../profile/employeeForm"
import {CustomerForm} from "../profile/CustomerForm"

export const Profile = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //return employee form        
        return <EmployeeForm />
    }
    else {
        //return customer form
        return <CustomerForm />
    }
}