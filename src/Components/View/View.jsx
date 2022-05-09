import React, { useState } from "react";
import axios from "axios";
import "./View.scss";
export default function View() {
  const [bref, setBref] = useState("");
  const [tNo, setTNo] = useState("");
  const [response, setResponse] = useState([]);
  const [receivedState, setReceivedState] = useState(false);

  const handleView = async () => {
    console.log("s");
    await axios
      .post("http://localhost:8080/view/data/", {
        bookingReference: bref,
        ticketNumber: tNo,
      })
      .then((response) => {
        console.log(response.data);
        setResponse(response.data);
        setReceivedState(true);
      });
  };

  const formatYmd = (date) => {
    return date.slice(0, 10);
  };

  const formatTime = (date) => {
    return date.slice(11, 16);
  };

  return (
    <div className="View-container">
      <div className="Left-container">
        <div className="Input-container">
          <input
            onChange={(e) => {
              setBref(e.target.value);
            }}
            type="text"
            placeholder="Booking reference"
          />
        </div>
        <div className="Input-container">
          <input
            onChange={(e) => {
              setTNo(e.target.value);
            }}
            type="text"
            placeholder="Ticket Number"
          />
        </div>
        <div className="Button-container">
          <button onClick={handleView}>View</button>
        </div>
      </div>
      <div className="Right-container">
        {receivedState ? (
          <>
            <div className="Table-container">
              <table>
                <tr>
                  <th>Book Date</th>
                  <th>Arrival Time</th>
                  <th>Depature Time</th>
                  <th>Flight No</th>
                  <th>Seat Number</th>
                  <th>Seat Type</th>
                  <th>Boarding gate</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Status</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone Number</th>
                  <th>Ticket Cost</th>
                  <th>Total Cost</th>
                </tr>
                {response.map((value, key) => (
                  <tr>
                    <td>{formatYmd(value.book_date)}</td>
                    <td>{formatTime(value.scheduled_arrival)}</td>
                    <td>{formatTime(value.scheduled_departure)}</td>
                    <td>{value.flight_no}</td>
                    <td>{value.seat_no}</td>
                    <td>{value.fare_conditions}</td>
                    <td>{value.boarding_no}</td>
                    <td>{value.arrival_airport}</td>
                    <td>{value.departure_airport}</td>
                    <td>{value.status}</td>
                    <td>{value.first_name}</td>
                    <td>{value.last_name}</td>
                    <td>{value.contact_no}</td>
                    <td>{value.amount}</td>
                    <td>{value.total_amount}</td>
                  </tr>
                ))}
              </table>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
