import React, { useState } from "react";
import "./Update.scss";
import axios from "axios";
import { GrFormEdit } from "react-icons/gr";
import { Button, Modal } from "react-bootstrap/";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Update() {
  const [AircraftCode, setAircraftCode] = useState("");
  const [receivedState, setReceivedState] = useState(false);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [oldSn, setOldSN] = useState("");
  const [sn, setSN] = useState("");
  const [oldfc, setOldFc] = useState("");
  const [fc, setFC] = useState("");
  const [headerData, setHeaderData] = useState([
    "Business",
    "Comfort",
    "Economy",
  ]);

  const handleClick = async () => {
    //axios call
    await axios
      .post("http://localhost:8080/updateData/get/", {
        AircraftCode: AircraftCode,
      })
      .then((response) => {
        setData(response.data);
        setReceivedState(true);
      });
  };

  const handleSubmitClick = async () => {
    await axios
      .post("http://localhost:8080/update/values/", {
        AircraftCode: AircraftCode,
        FairCondition: fc,
        SeatNumber: sn,
        oldSeatNumber: oldSn,
        oldFairCondtion: oldfc,
      })
      .then((res) => {
        console.log(res);
        handleClose();
      });
  };

  const handleEdit = (seat_no, fairCondition) => {
    setOldSN(seat_no);
    setOldFc(fairCondition);
    setSN(seat_no);
    setFC(fairCondition);
    handleShow();
  };

  return (
    <div>
      <div className="Update-container">
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
        <>
          {receivedState === true ? (
            <>
              <div className="Header-container">
                <h2>EDIT AND SUBMIT</h2>
              </div>
              <div className="Table-container">
                <table>
                  <tr>
                    <th>Seat Number</th>
                    <th>Fare Condition</th>
                    <th>Edit</th>
                  </tr>
                  {data.map((value, key) => (
                    <tr>
                      <td>{value.seat_no}</td>
                      <td>{value.fare_conditions}</td>
                      <td>
                        <GrFormEdit
                          onClick={() => {
                            handleEdit(value.seat_no, value.fare_conditions);
                          }}
                          style={{ cursor: "pointer", fontSize: "25px" }}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      </div>
      <>
        <Modal
          size="lg"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Value</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="Input-container">
              <label style={{ marginRight: "70px" }}>SEAT NUMBER: </label>
              <input
                value={sn}
                disabled
                onChange={(e) => setSN(e.target.value)}
                type="text"
              />
            </div>
            <div className="Input-container">
              <label style={{ marginRight: "45px" }}>FAIR CONDITIONS: </label>
              <span className="Dropdown-Container">
                <select
                  value={fc}
                  onChange={(event) => setFC(event.target.value)}
                >
                  {headerData.map((options, key) => (
                    <option key={key} value={options}>
                      {options}
                    </option>
                  ))}
                </select>
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleSubmitClick} variant="primary">
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}
