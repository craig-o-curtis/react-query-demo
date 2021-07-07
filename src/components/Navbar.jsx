import React from "react";

const Navbar = ({ onNav }) => {
  return (
    <nav>
      <button onClick={() => onNav("planets")}>Planets</button>
      <button onClick={() => onNav("people")}>People</button>
    </nav>
  );
};

export default Navbar;
