import React,{useState, useEffect}  from 'react';
import '../styles/sidebar.scss'
import { GiFilmSpool } from 'react-icons/gi';
import { AiOutlineHome , AiOutlineContacts} from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import {RiVideoAddLine} from 'react-icons/ri';

const Sidebar =()=>{
    const [showNavMenu, setShowNavMenu]= useState(false);

    const handeShowMenu=()=>{
        setShowNavMenu(!showNavMenu);
    }

    useEffect(() => {
      }, [showNavMenu]);
return(
    <div className='side-bar'>
        <button onClick={handeShowMenu} className='toggle-button btn'>Menu</button>
        <h4><GiFilmSpool/><span>Video Menu</span></h4>
        <div className={showNavMenu?'nav-menu show-menu':'nav-menu'}>
            <a href="#home" className="btn ">
            <AiOutlineHome/><span>Home</span>
            </a>
            <a href="#favorites" className="btn ">
            <CgWebsite/><span>Liked Videos</span>
            </a>
            <a href="#about" className="btn ">
            <AiOutlineContacts/><span>Contacts</span>
            </a>
            <a href="#bookNow" className="btn "><RiVideoAddLine/>
            <span>Add video</span>
            </a>
      </div>
    </div>
)
}


export default Sidebar;