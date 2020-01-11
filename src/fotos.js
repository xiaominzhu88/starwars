import React from "react";

import attack from "./attack.jpg";
import jedi from "./Jedi.jpg";
import revenge from "./Revenge.jpg";
import hope from "./hope.jpg";
import empire from "./Empire.jpg";
import awakens from "./Awakens.jpg";
import phantom from "./phantom.jpg";

const films = {
  "4": hope,
  "7": awakens,
  "5": empire
};

const Fotos = ({ selectedMovieId }) => (
  <div>
    <img src={films[selectedMovieId]} />
  </div>
);

export default Fotos;
