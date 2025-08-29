
import Header_Host from './Header_Host';
import './HostHome.css';
import This_Week_Menu from './This_Week_Menu';




const HostHome = () => {

  return (

    <div className="hosthome">
      <Header_Host />
      <main>
        <div className="container">
          <This_Week_Menu />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default HostHome;