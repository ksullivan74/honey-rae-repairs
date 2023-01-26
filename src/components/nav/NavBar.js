
import { EmployeeNav } from "./employeeNav"
import { CustomerNav } from "./customerNav"

export const NavBar = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //return emplyee views
        return <EmployeeNav />

    }
    else {
        //return customer views
        return <CustomerNav />
    }

       
}

