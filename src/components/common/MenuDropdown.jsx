import React from "react";
import { Dropdown } from "react-bootstrap";
import { decodeToken} from '../../services/authService';
import { NavLink } from "react-router-dom";

export default () => {
  const user = decodeToken();
  return (
    <Dropdown>
      <Dropdown.Toggle  style={{backgroundColor:'unset', outline:'none', border:'none'}}>
        More
      </Dropdown.Toggle>
  
      <Dropdown.Menu style={{color:'black'}}>
        <NavLink to="/profile"> <Dropdown.Item as="div"> Profile </Dropdown.Item></NavLink>
        <NavLink to="/create"> <Dropdown.Item as="div"> Create order </Dropdown.Item></NavLink>
        <NavLink to="/dashboard"> <Dropdown.Item as="div"> My Others </Dropdown.Item></NavLink>
        
        <NavLink to="/users"> <Dropdown.Item as="div"> All Users </Dropdown.Item></NavLink>
        <NavLink to="/all-orders"> <Dropdown.Item as="div"> All Orders </Dropdown.Item></NavLink>
       
       
      </Dropdown.Menu>
    </Dropdown>
  );
}
