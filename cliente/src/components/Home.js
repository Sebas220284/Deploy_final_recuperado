import{ useContext, useState } from 'react'
import {authContext, context, useAuth} from '../context/authContext'
import styles from "./style.module.scss";
import { Navigate, useNavigate,Link, useLocation } from 'react-router-dom';

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from 'react-icons/bi'
import * as RiIcons from 'react-icons/ri'
import { Sliderbar } from '../pages/Sliderbar';
import {GiDinosaurRex} from "react-icons/gi"


import '../index.css'
import '../App.css'
import { IconContext } from 'react-icons';

function Home() {



const authContext=useAuth()
const [sidebar, setSidebar] = useState(!false);

const showSidebar = () => setSidebar(!sidebar);
const { state } = useLocation();

//console.log(authContext)
const {user,logout,loading}=useAuth()
console.log(user)
const handLogout=async()=>{
try {
  await logout()
} catch (error) {
  console.log(error)
}

}
if(loading) return <h1>loading</h1>

  return (
    <div>
                
<IconContext.Provider value={{ color: "undefined" }}>

        <div className="navbar">
            
            <Link  className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>

            <Link to="/" className='menu-bars'>
            <span className=''>DINOBUS</span>
            <GiDinosaurRex/>
            </Link> 
          
       

     <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
               
              </li>
              
<h4 className='nav-text'>Bienvenido<br/><br/><br/>{user.displayName || user.email
} </h4>

<br/>

              <button onClick={handLogout}  className='nav-text'>logout</button>
         
<br/>
              {Sliderbar.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icons}
                      <span>{item.title}</span>
                      
                    </Link>
                    
                  </li>
                  
                  
                );
                
              })}

            </ul>
          </nav>
</div>
</IconContext.Provider>

  </div>
  )
}

export default Home
