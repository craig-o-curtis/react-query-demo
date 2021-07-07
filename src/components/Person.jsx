import React from "react";

const Person = ({ person }) => {
  return (
    <div className="card">
      <h3>{person.name}</h3>
      <p>Gender - {person.gender}</p>
      <p>Hair color - {person.hair_color}</p>
    </div>
  );
};

export default Person;
