import { Outlet, Route, Routes } from "react-router-dom"
import { TicketList } from "../tickets/TicketList"
import { TicketSearch } from "../tickets/ticketSearch"
import { TicketContainer } from "../tickets/ticketContainer"
import { EmployeeList } from "../employees/employeeList"
import { CustomerList} from "../employees/customerList"
import {Profile} from "../profile/profile"

export const EmployeeViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="tickets" element={ <TicketContainer />} />
                <Route path="employees" element={ <EmployeeList />} />
                <Route path="customers" element={ <CustomerList />} />
                <Route path="profile" element={ <Profile />} />
            </Route>
        </Routes>
    )
}