import React from "react";
import UserInfo from "./UserInfo";
import DisplayInfo from "./DisplayInfo";

class MyComponent extends React.Component {
    render() {
        const myInfo = ['abb', 'hfj', 'dhf']
        return (
            <div>
                <UserInfo />
                <hr></hr>
                <DisplayInfo name="Phongpahm" age="21" />
                <hr></hr>
                <DisplayInfo name="DaikPhong" age="22" myInfo={myInfo} />
            </div>
        );
    }
}
export default MyComponent;