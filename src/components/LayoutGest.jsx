
import { Outlet, Link } from "react-router-dom";
import '../pages/Host/HostHome.css';
import './Layout.css';

import HostHome from "../pages/Host/HostHome";
import ShoppingList from "../pages/Host/ShoppingList";

import Header_Host from "./Header_Host";


const LayoutGest = () => {
  return (
    <div className="gesthome">
      <Header_Host />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025.my-dinner-app</p>
      </footer>
    </div>
  );
};

export default LayoutGest;