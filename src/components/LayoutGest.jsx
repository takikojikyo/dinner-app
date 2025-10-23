
import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import '../pages/Host/HostHome.css';
import './Layout.css';

import Header_Gest from "./Header_Gest";





const LayoutGest = () => {
  const [category, setCategory] = useState("");
  const [menu, setMenu] = useState(null);
  const [day, setDay] = useState("");
  const [menuList, setMenuList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [gestId, setGestID] = useState("");

  useEffect(() => {
    let Id = localStorage.getItem("gestId");
    if (!Id) {
      Id = `gest-${crypto.randomUUID().slice(0, 8)}`;
      localStorage.setItem("gestId", Id);
    }
    setGestID(Id);
  }, [])




  return (
    <div className="gesthome">
      <Header_Gest />
      <main>
        <Outlet
          context={
            {
              category, setCategory,
              menu, setMenu,
              day, setDay,
              menuList, setMenuList,
              editingIndex, setEditingIndex,
              gestId,setGestID
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