import 'react-pro-sidebar/dist/css/styles.css'

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';
import { FaReact } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";
import './SideBar.scss'
import { Link } from 'react-router-dom';
const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <FaReact size={'3em'} color='yellow' />
                        Free Quizz
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<AiFillDashboard />}
                        // suffix={<span className="badge red">new</span>}
                        >
                            Dashboard
                            <Link to="/admins"></Link>
                        </MenuItem>
                        {/* <MenuItem icon={<FaGem />}>Features</MenuItem> */}
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            // suffix={<span className="badge yellow">3</span>}
                            icon={<FaGem />}
                            title={"Features"}
                        >
                            <MenuItem> User Management
                                <Link to="/admins/manage-users"></Link>
                            </MenuItem>
                            <MenuItem> Quizz Management
                                <Link to="/admins/manage-quizzes"></Link>
                            </MenuItem>
                            <MenuItem> Question Management
                                <Link to="/admins/manage-questions"></Link>
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/PhongPahmm"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                PhongPahmm
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
export default SideBar;