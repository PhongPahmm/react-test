import imageHomePage from "../../assets/hero.webp"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate()

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
                    {isAuthenticated === false
                        ?
                        <button onClick={() => { navigate('/') }}>Get's started. It's free</button>
                        :
                        <button onClick={() => { navigate('/users') }}>Doing quiz now!</button>
                    }
                </div>
            </div>
        </div>
    )
}
export default HomePage;