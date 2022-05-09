import axios from "axios";
import React, { useState } from "react";
import ToggleSwitch from "../Insert/ToggleSwitch/ToggleSwitch";
import "./Delete.scss";

export default function Delete() {
  const [AircraftCode, setAircraftCode] = useState("");
  const [switchState, setSwitchState] = useState("AC");
  const [bookingRef, setBookingRef] = useState("");

  const handleClick = async () => {
    await axios
      .post("http://localhost:8080/deleteAircraft/data/", {
        AircraftCode: AircraftCode,
      })
      .then((response) => {
        if (response.data === "done") {
          setAircraftCode("");
          alert("done")
        }
      });
  };

  const handleBookClick = async () => {
    await axios
      .post("http://localhost:8080/deleteBooking/data/", {
        BookingRef: bookingRef,
      })
      .then((response) => {
        if (response.data === "done") {
          setBookingRef("");
          alert("done")
        }
      });
  };

  const renderSwitch = (label) => {
    //returns data based on the label case
    switch (label) {
      case "AC":
        return (
          <>
            <div className="Input-container">
              <input
                onChange={(e) => setAircraftCode(e.target.value)}
                type="text"
                value={AircraftCode}
                placeholder="Aircraft Code (***)"
              />
            </div>
            <div className="Button-container">
              <button onClick={handleClick}>Submit</button>
            </div>
          </>
        );
      case "Seat":
        return (
          <>
            <div className="Input-container">
              <input
                onChange={(e) => setBookingRef(e.target.value)}
                type="text"
                value={bookingRef}
                placeholder="Booking ref"
              />
            </div>
            <div className="Button-container">
              <button onClick={handleBookClick}>Submit</button>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <div className="Delete-container">
        <ToggleSwitch
          type1={"Aircraft"}
          type2={"Booking"}
          setSwitchState={setSwitchState}
        />
        {renderSwitch(switchState)}
      </div>
    </div>
  );
}
