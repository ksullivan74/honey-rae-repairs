import {CustomerViews} from "./customerViews"
import {EmployeeViews} from "./employeeViews"

export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    if (honeyUserObject.staff) {
        //return emplyee views
        return <EmployeeViews />

    }
    else {
        //return customer views
        return <CustomerViews />
    }

       
}