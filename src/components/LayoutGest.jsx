
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import '../pages/Host/HostHome.css';
import './Layout.css';

import Header_Gest from "./Header_Gest";





const LayoutGest = () => {
  const[category,setCategory]=useState("");
  const[menu,setMenu]=useState("");
  const[day,setDay]=useState("");
  const[menuList,setMenuList]=useState([]);

  return (
    <div className="gesthome">
      <Header_Gest />
      <main>
        <Outlet 
        context={
          {
            category,setCategory,
            menu,setMenu,
            day,setDay,
            menuList,setMenuList
          }
        }
        />
      </main>
      <footer>
        <p>© 2025.my-dinner-app</p>
      </footer>
    </div>
  );
};

export default LayoutGest;