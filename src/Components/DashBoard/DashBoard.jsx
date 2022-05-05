import React, { useState } from 'react'
import Delete from '../Delete/Delete';
import Insert from '../Insert/Insert';
import Navbar from '../NavBar/Navbar'
import Update from '../Update/Update';
import View from '../View/View';

export default function DashBoard() {

  const [navState, setNavState] = useState("view")

  const renderSwitch = (label) => {
    //returns data based on the label case 
    switch (label) {
      case "view":
        return (
          <View/>
        );
      case "insert":
        return (
          <Insert/>
        );
      case "update":
        return (
            <Update/>
        );
        case "delete":
        return (
            <Delete/>
        );
        default:
            return(
                <></>
            )
    }
  };

  return (
    <div>
      <Navbar setNavState={setNavState}/>
      {renderSwitch(navState)}
    </div>
  )
}
