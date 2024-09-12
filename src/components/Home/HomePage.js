import imageHomePage from "../../assets/hero.webp"

const HomePage = (props) => {
    return (
        <div className="homepage-container">
            <div className="homepage-img">
                <img src={imageHomePage}></img>
            </div>
            <div className="homepage-content">
                <div className="title-1">Make forms
                    worth filling out</div>
                <div className="title-2">Get more data—like signups, feedback,
                    and anything else—with forms designed to be refreshingly different.</div>
                <div className="title-3">
                    <button>Get's started. It's free</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;