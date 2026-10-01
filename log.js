// ================================
// KSRTC BUS BOOKING - JAVASCRIPT
// ================================

const bookingForm = document.getElementById("bookingForm");
const results = document.getElementById("results");


// ---------- Set Minimum Date ----------

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


// ---------- Form Submit ----------

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;
    const passengers =
        parseInt(document.getElementById("passengers").value);


    // Check source and destination

    if (from === "" || to === "" || date === "") {
        alert("Please fill in all required fields.");
        return;
    }


    // Source and destination cannot be same

    if (from === to) {
        alert("Leaving From and Going To cannot be the same.");
        return;
    }


    // Sample buses

    const buses = [
        {
            name: "KSRTC Super Fast",
            departure: "08:30 AM",
            arrival: "02:30 PM",
            fare: 450
        },

        {
            name: "KSRTC Express",
            departure: "10:15 AM",
            arrival: "04:30 PM",
            fare: 520
        },

        {
            name: "KSRTC Deluxe",
            departure: "01:00 PM",
            arrival: "07:00 PM",
            fare: 650
        }
    ];


    displayBuses(
        buses,
        from,
        to,
        date,
        passengers
    );

});


// ---------- Display Buses ----------

function displayBuses(
    buses,
    from,
    to,
    date,
    passengers
) {

    results.innerHTML = "";

    const heading = document.createElement("h2");

    heading.textContent =
        `Available Buses: ${from} → ${to}`;

    results.appendChild(heading);


    buses.forEach(function (bus) {

        const totalFare =
            bus.fare * passengers;


        const card =
            document.createElement("div");

        card.className = "bus-card";


        card.innerHTML = `
            <div class="bus-info">

                <h3>${bus.name}</h3>

                <p>
                    <strong>${from}</strong>
                    →
                    <strong>${to}</strong>
                </p>

                <p>
                    Departure:
                    ${bus.departure}
                </p>

                <p>
                    Arrival:
                    ${bus.arrival}
                </p>

                <p>
                    Passengers:
                    ${passengers}
                </p>

                <p>
                    Fare:
                    ₹${bus.fare} × ${passengers}
                    = <strong>₹${totalFare}</strong>
                </p>

            </div>

            <button
                class="book-btn"
                onclick="bookBus(
                    '${bus.name}',
                    '${from}',
                    '${to}',
                    '${date}',
                    ${passengers},
                    ${totalFare}
                )">

                Book Now

            </button>
        `;


        results.appendChild(card);

    });

}


// ---------- Book Bus ----------

function bookBus(
    busName,
    from,
    to,
    date,
    passengers,
    totalFare
) {

    const formattedDate =
        new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            }
        );


    const confirmation =
        confirm(
            `Confirm your booking?

Bus: ${busName}
Route: ${from} → ${to}
Date: ${formattedDate}
Passengers: ${passengers}
Total Fare: ₹${totalFare}`
        );


    if (confirmation) {

        alert(
            `Booking Successful!

Bus: ${busName}
Route: ${from} → ${to}
Date: ${formattedDate}
Passengers: ${passengers}
Total Fare: ₹${totalFare}

Thank you for booking with KSRTC.`
        );

    }

}
