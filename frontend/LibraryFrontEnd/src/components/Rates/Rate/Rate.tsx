import "./Rate.css"

type RateType = {
  rate: number;
};

export function Rate({ rate }: RateType) {
  const rateArray = new Array<number>(rate).fill(1);

  return (
    <>
    <div className="rate_container--flex">
    {rateArray.map((rate, index) => (
        <div className='rate_star' key={index}> &#9733;</div>
      ))}
    </div>
      
    </>
  );
}
