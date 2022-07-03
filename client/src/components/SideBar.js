import React,{useState, useEffect}  from 'react';
import '../styles/sidebar.scss'
import { GiFilmSpool,GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineHome , AiOutlineContacts} from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { MdVideoLibrary } from 'react-icons/md';
import {RiVideoAddLine} from 'react-icons/ri';


const Sidebar =({handleClick})=>{
    const [showNavMenu, setShowNavMenu]= useState(false);
    const [active, setActive]= useState('#home');

 
    const handleShowMenu=()=>{
        setShowNavMenu(!showNavMenu);
    }

    useEffect(() => {
      }, [showNavMenu]);
return(
    <div className='side-bar'>
            <button onClick={handleShowMenu} className='toggle-button btn'><GiHamburgerMenu/></button>
            <h2>
                <span className='menu-icon'><GiFilmSpool/></span>
                <span>Video Menu</span>
            </h2>
            <div className={showNavMenu?'nav-menu show-menu':'nav-menu'}>
                    <a  href="#home" className="btn side-nav-items active">
                        <span className='side-icons'><AiOutlineHome/></span><span>Home</span>
                    </a>
                    <a  href="#favorites" className="btn side-nav-items ">
                        <span className='side-icons'><CgWebsite/></span><span>Liked Videos</span>
                    </a>
                    <a  href="#library" className="btn side-nav-items ">
                        <span className='side-icons'><MdVideoLibrary/></span><span>Library</span>
                    </a>
                    <span className='add-video-border'></span>
                    <a  href="#bookNow" className="btn side-nav-items" onClick={handleClick} ><span className='side-icons'><RiVideoAddLine/></span>
                         <span>Add Video</span>
                    </a>
                
            </div>
   
    </div>
)
}


export default Sidebar;