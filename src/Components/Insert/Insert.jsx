import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import "./Insert.scss";
import axios from "axios";

export default function Insert() {
  const [acAircraftCode, setACaircraftCode] = useState("");
  const [model, setModel] = useState("");
  const [range, setRange] = useState("");
  const [seatAircraftCode, setSeataircraftCode] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [fairCondition, setfairCondition] = useState("Business");
  const [switchState, setSwitchState] = useState("AC");
  const [headerData, setHeaderData] = useState([
    "Business",
    "Comfort",
    "Economy",
  ]);

  const handleClick = async () => {
    if (switchState === "AC") {
      let flag = false;
      if (acAircraftCode.length > 3) {
        alert("Aircraft code length greater than 3");
        flag = true;
      }
      // else if()

      //axios call
      if (flag === false) {
        await axios
          .post("http://localhost:8080/insertModel/data/", {
            AircraftCode: acAircraftCode,
            Model: model,
            Range: range,
          })
          .then((response) => {
            if (response.data === "done") {
              setACaircraftCode("");
              setModel("");
              setRange("");
              alert("Done");
            }
          });
      }
    } else if (switchState === "Seat") {
      let flag = false;
      if (seatAircraftCode.length < 3) {
        alert("Aircraft code length greater than 3");
        flag = true;
      }

      if (flag === false) {
        await axios
          .post("http://localhost:8080/insertSeat/data/", {
            AircraftCode: seatAircraftCode,
            SeatNumber: seatNumber,
            FairCondition: fairCondition,
          })
          .then((response) => {
            if (response.data === "done") {
              setSeataircraftCode("");
              setSeatNumber("");
              setfairCondition("Business");
              alert("Done");
            }
          });
      }
    }
  };

  const renderSwitch = (label) => {
    //returns data based on the label case
    switch (label) {
      case "AC":
        return (
          <>
            <div className="Input-container">
              <input
                onChange={(e) => setACaircraftCode(e.target.value)}
                value={acAircraftCode}
                type="text"
                placeholder="Aircraft Code (***)"
              />
            </div>
            <div className="Input-container">
              <input
                onChange={(e) => setModel(e.target.value)}
                value={model}
                type="text"
                placeholder="Model"
              />
            </div>
            <div className="Input-container">
              <input
                onChange={(e) => setRange(e.target.value)}
                value={range}
                type="text"
                placeholder="Range"
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
                onChange={(e) => setSeataircraftCode(e.target.value)}
                value={seatAircraftCode}
                type="text"
                placeholder="Aircraft Code (***)"
              />
            </div>
            <div className="Input-container">
              <input
                onChange={(e) => setSeatNumber(e.target.value)}
                type="text"
                value={seatNumber}
                placeholder="Seat Number"
              />
            </div>
            <div className="Dropdown-Container">
              <select
                value={fairCondition}
                onChange={(event) => setfairCondition(event.target.value)}
              >
                {headerData.map((options, key) => (
                  <option key={key} value={options}>
                    {options}
                  </option>
                ))}
              </select>
            </div>
            <div className="Button-container">
              <button onClick={handleClick}>Submit</button>
            </div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <ToggleSwitch
        type1={"Aircraft Code"}
        type2={"Seat"}
        setSwitchState={setSwitchState}
      />
      <div className="Insert-container">{renderSwitch(switchState)}</div>
    </div>
  );
}
