import { ThemeContext } from "../App/App";
import "./StoryCard.css"

export const StoryCard = () => {
    
    return (
        <>
            <ThemeContext.Consumer >
                {(theme) => (
                    <section className={`StoryCard_container StoryCard_container--${theme}`}>
                        <header>Create your own short story</header>
                        <body>
                            
                        </body>
                    </section>
                )
            }
            </ThemeContext.Consumer>            
        </>
    );
}