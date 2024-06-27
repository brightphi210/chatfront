
import { Outlet, Navigate } from "react-router-dom";
import { useState, useContext, createContext } from "react";



const PrivateRoute = () => {
    const sender = localStorage.getItem('username')
    return sender ? <Outlet /> : <Navigate to={'/join'}/>
}

export default PrivateRoute; 


