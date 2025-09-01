
import { Link } from 'react-router-dom';
import Header_Host from './Header_Host';
import './HostHome.css';
import This_Week_Menu from './This_Week_Menu';




const HostHome = () => {

  return (

    <>
      <div className="container">
        <This_Week_Menu />

        <Link to="shopping-list" className="shopping_list_button">
          <img src="/5.png" alt="買い物かご" />
          <p>買い出しリスト</p>
        </Link>
      </div>
    </>
  );
}

export default HostHome;