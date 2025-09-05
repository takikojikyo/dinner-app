
import { Outlet, Link } from "react-router-dom";
import '../pages/Host/HostHome.css';
import './Layout.css';

import Header_Gest from "./Header_Gest";




const LayoutGest = () => {
  return (
    <div className="gesthome">
      <Header_Gest />
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