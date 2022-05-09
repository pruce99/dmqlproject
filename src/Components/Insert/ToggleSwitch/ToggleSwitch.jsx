import React, { useState } from "react";
import "./ToggleSwitch.scss";

export default function ToggleSwitch(props) {
  const [acSwitchState, setACSwitchState] = useState("true");
  const [seatSwitchState, setSeatSwitchState] = useState("false");

  // Function, which helps changing CSS and sets switchState(gender or race)
  // which helps data to be render based on the switchState
  const handleACSwitch = () => {
    setACSwitchState("true");
    setSeatSwitchState("false");
    props.setSwitchState("AC");
  };

  const handleSeatSwitch = () => {
    setACSwitchState("false");
    setSeatSwitchState("true");
    props.setSwitchState("Seat");
  };

  return (
    //A component which switches between gender and race
    <div className="Toggle-container">
      <div
        style={{ marginLeft: "30px" }}
        onClick={handleACSwitch}
        className={`Switch-container ${acSwitchState}`}
      >
        {props.type1}
      </div>
      <div
        onClick={handleSeatSwitch}
        className={`Switch-container ${seatSwitchState}`}
      >
        {props.type2}
      </div>
    </div>
  );
}
