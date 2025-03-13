import openAiSvg from "../../media/openAi.svg";
import "./WaitingImage.css";

type WaitingImageType = {
    waitingImage: string;
}

export const WaitingImage = ({ waitingImage }: WaitingImageType) => {
    return (
        <>
            <img className="icone waitingImage" src={waitingImage} alt="waitingImage" />
        </>
    );
}