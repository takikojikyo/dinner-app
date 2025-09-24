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




const LayoutHost = ({ setIsHost }) => {
  const [category, setCategory] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    mealDays: 0,
    fishDays: 0,
    otherDays: 0,
    voteDeadline: '',
  });

  return (
    <div className="hosthome">
      <Header_Host 
      setIsHost={setIsHost} 
      formData={formData}
      setFormData={setFormData} 
      />
      <main>
        <Outlet context={{ category, setCategory, selectedMenu, setSelectedMenu,formData,setFormData }} />
      </main>
      <footer>
        <p>© 2025.my-dinner-app</p>
      </footer>
    </div>
  );
};

export default LayoutHost;