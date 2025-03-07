import "./ReadingRange.css"
import  { ChangeEvent,useContext,useState } from "react";
import { ThemeContext } from "../../../App/App";

type HandleReadingTimeType = {
    readingTime: (readingTime: string) => void;
}

export const ReadingRange = (readingTimeHandler: HandleReadingTimeType) => {
    const defaultReadingTime = "6";
    const theme = useContext(ThemeContext);
    const [rangeValue, setRangeValue] = useState<string>(defaultReadingTime);
    const handleRangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setRangeValue(event.target.value);
        readingTimeHandler.readingTime(event.target.value);
    }
        return (
            <>
                <section className={`ReadingRange--flex ReadingRange--flex--${theme}`}> Reading time:
                    <label className="RangeLabel" htmlFor="Reading_time_slider">{`${rangeValue} min`}
                    </label>
                    <input
                        className="Reading_time_slider"
                        type="range" min="1" max="21" step="5"
                        value={rangeValue}
                        onChange={handleRangeValue}
                    >
                    </input>
                </section>
            </>
        );
    }