
import { Link } from 'react-router-dom';
import Header_Host from '../../components/Header_Host';
import './HostHome.css';
import This_Week_Menu from './This_Week_Menu';
import StepWarning from './StepWarning';




const HostHome = () => {

  return (

    <>
      <div className="container">
        <StepWarning/>
        <This_Week_Menu />

        <Link to="shopping-list" className="shopping_list_button shopping_list_button1">
          <p>買い出しリスト</p>
        </Link>
      </div>
    </>
  );
}

export default HostHome;