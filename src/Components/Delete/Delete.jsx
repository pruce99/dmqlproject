import React, {useState} from "react";
import "./Delete.scss";

export default function Delete() {
  const [AircraftCode, setAircraftCode] = useState("");

  const handleClick = () => {
    let objectToSend = {};
    objectToSend["AircraftCode"] = AircraftCode;
    //axios call
  };

  return (
    <div>
      <div className="Delete-container">
        <div className="Input-container">
          <input
            onChange={(e) => setAircraftCode(e.target.value)}
            type="text"
            placeholder="Aircraft Code (***)"
          />
        </div>
        <div className="Button-container">
          <button onClick={handleClick}>Submit</button>
        </div>
      </div>
    </div>
  );
}
