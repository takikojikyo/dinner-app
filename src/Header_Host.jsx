import { useState } from 'react';

const Header_Host=()=>{
const [isMenuOpen, setIsMenuOpen] = useState(false);
const toggleMenu=()=>setIsMenuOpen(prev => !prev);


  return(
    <header>
        <div className="HeaderTop">
          <div className="container">
            <button className="header_app_title">
              <img src="/app.png" alt="アプリのアイコン" />
              <h1>だれか決めて！晩ごはん</h1>
            </button>
            <div className="header_mode">
              <img src="/m1.png" alt="フライパン" />
              <h2>作る人モード</h2>
            </div>
          </div>
        </div>
        <div className="HeaderBottom">
          <div className="container">
            <div className={`MenuToggle ${isMenuOpen?"open":""}`}  onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <button className="Toggle_mode">
              <img className="Toggle_mode_img" src="/m3.png" alt="" />
              <p>食べる人モード切替</p>
              <img className="arrow" src="/arrow2.png" alt="" />
            </button>
          </div>
        </div>
      </header>
  )
}

export default Header_Host