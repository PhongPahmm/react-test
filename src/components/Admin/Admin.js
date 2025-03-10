import SideBar from "./SideBar.js";
import { FaBars } from 'react-icons/fa';
import './Admin.scss'
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} />
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>

        </div>
    )
}
export default Admin;