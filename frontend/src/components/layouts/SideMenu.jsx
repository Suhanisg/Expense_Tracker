import React, {useContext} from 'react';
import {SIDE_MENU_DATA} from "../../utils/data.js";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/userContext.jsx";

const SideMenu = ({activeMenu}) => {
    const {user,clearUser}=useContext(UserContext);

    const navigate=useNavigate();

    const handleClick=(route)=>{
        if(route === "logout"){
            handelLogout();
            return;
        }
        navigate(route);
    }
    const handelLogout=()=>{
        localStorage.clear();
        clearUser();
        navigate('/login');
    };

    return (
        <div className="">
            {user?.profileImageUrl?(
                <img
                    src={user?.profileImageUrl || ""}
                    alt="Profile Image"
                    className=""
                />): <></>}
            <h5 className="">
                {user?.fullName || ""}
            </h5>
        </div>



    )
}
export default SideMenu;