import React from 'react';
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps"
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logo from '../img/Logo.png'

const Header = () => {
    return (
        <div className='header'>

            <div className='header__left'>
                <img src={Logo} alt='logo' className='logo' />
            </div>

            <div className="header__center">
                <input type='text' placeholder="Search" />
                <SearchIcon className="searchIcon" />

            </div>

            <div className="header__right">
                <VideoCallIcon />
                <AppsIcon />
                <NotificationsIcon />
            </div>

        </div>

    )
}

export default Header
