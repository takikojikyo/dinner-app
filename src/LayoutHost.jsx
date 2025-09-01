
import { Outlet, Link } from "react-router-dom";
import './HostHome.css';
import './Layout.css';

import HostHome from "./HostHome";
import ShoppingList from "./ShoppingList";

import Header_Host from "./Header_Host";


const LayoutHost = () => {
  return (
    <div className="hosthome">
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

export default LayoutHost;