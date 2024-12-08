import "./ReadingRange.css"
import  { ChangeEvent,useContext,useState } from "react";
import { ThemeContext } from "../../../App/App";

export const ReadingRange = () => {
    const theme = useContext(ThemeContext);
    const [rangeValue, setRangeValue] = useState<string>("5");

    const handleRangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setRangeValue(event.target.value);
    }
        return (
            <>
                <section className={`ReadingRange--flex ReadingRange--flex--${theme}`}> Reading time:
                    <label className="RangeLabel" htmlFor="Reading_time_slider">{`${rangeValue} min`}
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