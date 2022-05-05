import React from "react";
import "./Navbar.scss";

export default function Navbar(props) {
  return (
      <div className="Navbar-container">
        <div className="Navbar-header">
          <p>DQML PROJECT</p>
        </div>
        <div onClick={()=>props.setNavState("view")}>View</div>
        <div onClick={()=>props.setNavState("insert")}>INSERT</div>
        <div onClick={()=>props.setNavState("update")}>UPDATE</div>
        <div onClick={()=>props.setNavState("delete")}>DELETE</div>
      </div>
  );
}
