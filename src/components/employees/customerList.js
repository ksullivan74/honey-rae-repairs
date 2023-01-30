import {useState, useEffect} from "react";


export  const CustomerList = () => {
    const[customers, setCustomers] = useState([])

    useEffect (
        () => {
            return fetch("http://localhost:8088/customers/?_expand=user")
            .then(resp => resp.json())
            .then((customerArray) => {
                setCustomers(customerArray)
            })
        },
        []

    )

   // if (customers.user.isStaff === false ) {

    return <article>
        {
            customers.map(
                (customer) => {
                return <section>
                    <div> Name: {customer.user.fullName}</div>
                    <div>Email: {customer.user.email}</div>
                    <div>Phone: {customer.phoneNumber}</div>
                    <div>Address: {customer.address}</div>
                    </section>
                }
            )
        }
    </article>
 //   }

}