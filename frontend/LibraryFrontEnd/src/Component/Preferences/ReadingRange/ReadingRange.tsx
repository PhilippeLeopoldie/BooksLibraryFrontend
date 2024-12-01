import "./ReadingRange.css"
import  { ChangeEvent,useState } from "react";


export const ReadingRange = () => {
    const [rangeValue, setRangeValue] = useState<string>("5");

    const handleRangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setRangeValue(event.target.value);
    }
        return (
            <>
                <section className="ReadingRange--flex"> Reading time:
                    <label className="rangeLabel" htmlFor="rangeInput">{`${rangeValue} min`}
                    </label>
                    <input
                        className="Reading_time_slider"
                        type="range" min="0" max="20" step="5"
                        value={rangeValue}
                        onChange={handleRangeValue}
                    >
                    </input>
                </section>
            </>
        );
    }