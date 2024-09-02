import React from "react";

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
            <div>
                <button onClick={() => { this.handleShowHide() }}>
                    {this.state.isShowList == true ? "Hide user's list" : "Show user's list"}
                </button>
                {this.state.isShowList &&
                    <div>
                        {listUsers.map((user, index) => {
                            return (
                                <div key={index} className={+user.age > 18 ? "red" : "green"}>
                                    <div>My name is {user.name}</div>
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