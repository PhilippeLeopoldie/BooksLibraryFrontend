import "./ReadingRange.css"
import { ChangeEvent, useContext, useState } from "react";
import { ThemeContext } from "../../../App/App";

type HandleReadingTimeType = {
    readingTimeHandler: (readingTime: string) => void;
}

export const ReadingRange = ({ readingTimeHandler }: HandleReadingTimeType) => {
    const defaultReadingTime = "1";
    const theme = useContext(ThemeContext);
    const [rangeValue, setRangeValue] = useState<string>(defaultReadingTime);
    const allowedvalues = [1, 5, 10, 15, 20];
    const handleRangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        const rawvalue = Number(event.target.value);

        const closestValue = allowedvalues.reduce((prev, curr) =>
            Math.abs(curr - rawvalue) < Math.abs(prev - rawvalue) ? curr : prev);

        setRangeValue(closestValue.toString());
        readingTimeHandler(closestValue.toString());
    }
    return (
        <>
            <section className={`ReadingRange--flex ReadingRange--flex--${theme}`}>
                <p className={`instructions instructions--${theme}`}>Adjust the slider to choose your reading time:</p>
                <label className="RangeLabel" htmlFor="Reading_time_slider">{`${rangeValue} min`}
                </label>
                <input
                    className="Reading_time_slider"
                    type="range"
                    min="1"
                    max="21"
                    step="5"
                    value={rangeValue}
                    onChange={handleRangeValue}
                >
                </input>
            </section>
        </>
    );
}