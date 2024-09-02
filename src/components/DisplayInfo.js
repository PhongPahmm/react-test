import React from "react";
import './DisplayInfo.scss'
class DisplayInfo extends React.Component {

    state = {
        isShowList: true
    }
    handleShowHide = () => {
        this.setState({
            isShowList: !this.state.isShowList
        }
        )
    }

    render() {
        const { listUsers } = this.props
        console.log(listUsers)
        return (
            <div className="display-infor-container">
                <button onClick={() => { this.handleShowHide() }}>
                    {this.state.isShowList === true ? "Hide user's list" : "Show user's list"}
                </button>
                {this.state.isShowList &&
                    <div>
                        {listUsers.map((user, index) => {
                            return (
                                <div key={index} className={+user.age > 18 ? "red" : "green"}>
                                    <div style={{ color: "yellow", paddingTop: "20px" }}>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </div>}
            </div>
        );
    }
}
export default DisplayInfo;