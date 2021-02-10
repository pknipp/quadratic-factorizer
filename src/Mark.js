import React from 'react';
import correct from "./correct10.jpg";
import incorrect from "./incorrect10.jpeg";
const Mark = ({ grade }) => grade === null ? null : <img src={grade ? correct : incorrect} alt={grade ? "correct" : "incorrect"} />
export default Mark;
