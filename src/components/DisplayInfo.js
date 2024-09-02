import React from "react";
import './DisplayInfo.scss'
import logo from './../logo.svg'
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
                <img src={logo}></img>
                <button onClick={() => { this.handleShowHide() }}>
                    {this.state.isShowList === true ? "Hide user's list" : "Show user's list"}
                </button>
                {this.state.isShowList &&
                    <>
                        {listUsers.map((user, index) => {
                            return (
                                <div key={index} className={+user.age > 18 ? "red" : "green"}>
                                    <div>My name is {user.name}</div>
                                    <div>My age is {user.age}</div>
                                    <div>
                                        <button onClick={() => { this.props.handleDeleteUser(user.id) }}>Delete</button>
                                    </div>
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </>}
            </div>
        );
    }
}
export default DisplayInfo;