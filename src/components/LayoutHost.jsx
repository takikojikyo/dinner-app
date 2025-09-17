import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import '../pages/Host/HostHome.css';
import './Layout.css';

import HostHome from "../pages/Host/HostHome";
import ShoppingList from "../pages/Host/ShoppingList";

import Header_Host from "./Header_Host";
import MenuEdit1 from "../pages/MenuEdit/MenuEdit1";

import MenuEdit2 from "../pages/MenuEdit/MenuEdit2";
import MenuEdit3 from "../pages/MenuEdit/MenuEdit3";




const LayoutHost = ({setIsHost}) => {
  const[category,setCategory]=useState("");
  const[selectedMenu,setSelectedMenu]=useState(null);

  return (
    <div className="hosthome">
      <Header_Host setIsHost={setIsHost}/>
      <main>
        <Outlet context={{category,setCategory,selectedMenu,setSelectedMenu}}/>
      </main>
      <footer>
        <p>© 2025.my-dinner-app</p>
      </footer>
    </div>
  );
};

export default LayoutHost;