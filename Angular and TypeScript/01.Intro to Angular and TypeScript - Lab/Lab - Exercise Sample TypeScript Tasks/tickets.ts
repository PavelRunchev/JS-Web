function ticketsSorted(inputTickets, criteria) {
    class Ticket {
        public destination: string;
        public price: number;
        public status: string;
    
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }
    let tickets: Array<Ticket> = [];

    for (let ticket of inputTickets) {
        let token = ticket.split('|');
        let destination = token[0];
        let price = Number(token[1]);
        let status = token[2];
        let newTicket = new Ticket(destination, price, status);
        tickets.push(newTicket);
    }

    tickets.sort((a, b) => {
        if(criteria === 'price') {
            return a[criteria] - b[criteria];
        } else {
            return a[criteria].localeCompare(b[criteria]);
        }
    });

    return tickets;
}

let sorted = ticketsSorted(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'], 'status');

sorted.forEach(t => console.log(t));

