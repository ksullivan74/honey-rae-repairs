import {useState, useEffect} from "react";


export  const EmployeeList = () => {
    const[employees, setEmployees] = useState([])

    useEffect (
        () => {
            return fetch("http://localhost:8088/users?isStaff=true")
            .then(resp => resp.json())
            .then((employeearray) => {
                setEmployees(employeearray)
            })
        },
        []

    )

    return <article>
        {
            employees.map(
                (employee) => {
                return <section>
                    <div> Name: {employee.fullName}</div>
                    <div>Email: {employee.email}</div>
                    </section>
                }
            )
        }
    </article>

}