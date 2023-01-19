import { useEffect, useState } from "react"
import "./Tickets.css"

export const TicketList = () => {
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            fetch('http://localhost:8088/serviceTickets')
            .then(response => response.json())
            .then((ticketArray) => {
                    setTickets(ticketArray)
                }
            )
               //console.log("Initial state of tickets", tickets) // View the initial state of tickets
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            console.log(tickets)
            if (honeyUserObject.staff){
                // for employees
                setFiltered(tickets)
            }
            else{
                // for cubstomers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    return<>
     <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <section className="ticket">
                        <header>{ticket.description}</h eader>
                        <footer>Emergency: {ticket.emergency ? "Yes!!!!!" : "No"}</footer>
                    </section>
                }
            )
        }
    </article>
    </>
}