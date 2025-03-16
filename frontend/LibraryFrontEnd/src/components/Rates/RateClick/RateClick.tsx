import { useContext, useEffect, useState } from "react";
import "../Rate/Rate.css";
import { ThemeContext } from "../../../App/App";

type RateType = {
  rate: number;
  HandleRate: (newRate:number) => void;
};

export const RateClick = ({ rate, HandleRate }: RateType) => {
  const theme = useContext(ThemeContext);
  const numberOfStars: number = 5;
  const emptyStars = new Array<number>(numberOfStars).fill(0);
  const [filledStars, setFilledStars] = useState<number[]>(
    emptyStars.fill(1, 0, rate)
  );

  useEffect(() => {
    // Update filledStars when the rate prop changes
    const updatedFilledStars : number[] = emptyStars.map((_, index) => (index < rate ? 1 : 0));
    setFilledStars(updatedFilledStars);
  }, [rate]);

  const toggleStar = (index: number) => {
    // assign array element up to index with '1' and from index with '0'
    const updatedStars : number[] = filledStars.map((star,i) => (i<=index ? 1:0));
    setFilledStars(updatedStars);
    // sum the array value to pass it to HandleRate
    const newRate: number = updatedStars.reduce((a, b) => (a + b), 0);
    HandleRate(newRate);
  };

  return (
    <>
      <section className="rateClick_container--flex">
        {filledStars.map((isFilled, index) => (
          <div
            className={`rate_star--${theme} rateClick_star ${isFilled ? "filled" : "empty"}`}
            key={index}
            onClick={() => toggleStar(index)}           
          >
            &#9733;
          </div>
        ))}
      </section>
    </>
  );
}
