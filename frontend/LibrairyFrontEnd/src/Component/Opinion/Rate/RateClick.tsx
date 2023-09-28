import { useState } from "react";
import "./Rate.css";

type RateType = {
  rate: number;
  OpinionContextRate: Function;
};

export const RateClick = ({ rate, OpinionContextRate }: RateType) => {
  const numberOfStars: number = 5;
  const emptyStars = new Array<number>(numberOfStars).fill(0);
  const [filledStars, setFilledStars] = useState<number[]>(
    emptyStars.fill(1, 0, rate)
  );

  const toggleStar = (index: number) => {
    const updatedStars = [...filledStars];
    updatedStars[index] = updatedStars[index] === 1 ? 0 : 1;
    setFilledStars(updatedStars);
    const newRate: number = updatedStars.reduce((a, b) => a + b, 0);
    OpinionContextRate(newRate);
  };

  return (
    <>
      <div className="rate_container--flex">
        {filledStars.map((isFilled, index) => (
          <div
            className={`rate_star ${isFilled ? "filled" : "empty"}`}
            key={index}
            onClick={() => toggleStar(index)}
          >
            &#9733;
          </div>
        ))}
      </div>
    </>
  );
}
