import React, { useState } from "react";
import axios from "axios";
import "./View.scss";
export default function View() {
  const [bref, setBref] = useState("");
  const [tNo, setTNo] = useState("");
  const [response, setResponse] = useState([]);

  const handleView = async () => {
    console.log("s");
    await axios
      .post("http://localhost:8080/view/data/", {
        bookingReference: bref,
        ticketNumber: tNo,
      })
      .then((response) => setResponse(response.data));
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
        <table>
          <tr>
            <th>Book Date</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Ticket Cost</th>
          </tr>
          {response.map((value, key) => (
            <tr>
              <td>{value.seat_no}</td>
              <td>{value.fare_conditions}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
