import React, {useState, useEffect } from "react";
import "./Navbar.css"

const Navbar=()=>{
    const [show,handleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else handleShow(false);
        return()=>{
            window.removeEventListener("scroll");
        }
        })
    },[]);
    return(
        <div className={`nav ${show && "nav_black"}` }>
            <img 
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
             alt="Netflix Logo" />
             <span>
                 <ul className="nav_lists">
                     <li className="nav_list">Home</li>
                     <li className="nav_list">TV Shows</li>
                     <li className="nav_list">Movies</li>
                     <li className="nav_list">New &amp; Popular</li>
                     <li className="nav_list">Lists</li>

                </ul>
             </span>
            <img 
            className="nav_avtar"
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
             alt="Netflix Logo" />
        </div>
    );
}
export default Navbar;