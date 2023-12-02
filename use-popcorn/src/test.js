import { useState } from "react";
import StarRating from "./StarRating";

export default function Test() {
  const [movieRating, setMovieRating] = useState(0);


  return (<>
    <StarRating onSetRating={setMovieRating} />
    <p>Rating {movieRating}</p>
  </>
  )
}