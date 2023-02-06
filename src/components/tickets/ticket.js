import { Link } from "react-router-dom"

export const Ticket = ({ticketObject, currentUser, employees, getAllTickets}) => {

    let assignedEmployee = null

    if (ticketObject.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
                    method: "DELETE"
                })
                    .then (() => {
                        getAllTickets()
                    })
            }}  className="ticket_delete">Delete</button>
        }
        else {
            return ""
        }
    }

    const canClose = () => {
        if (userEmployee?.id === assignedEmployee?.id && ticketObject.dateCompleted ==="") {
            return <button onClick={closeTicket}  className="ticket_finish">Finish</button>
        }
        else {
            return ""
        }
    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        return fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        })
        .then(resp => resp.json())
        .then (getAllTickets)
    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <button
                        onClick={() => {
                          fetch(`http://localhost:8088/employeeTickets`,{
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userEmployee.id,
                                serviceTicketId: ticketObject.id
                            })
                          })
                          .then (resp => resp.json())
                          .then (() => {
                            getAllTickets()
                          })
                        }}>
                        Claim</button>
        }

        else {
            return ""
        }
    }

    return <section className="ticket">
        <header>
            {
                currentUser.staff
                ? `ticket ${ticketObject.id}`
                :<Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }
        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "Yes!!!!!" : "No"}</section>
        <footer>
            {
                ticketObject.employeeTickets.length
                    ? `Currently being worked on ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }
        </footer>
    </section>

}