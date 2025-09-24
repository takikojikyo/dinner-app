import { useState } from 'react';
import { Link } from 'react-router-dom';



const Header_Host = ({ setIsHost, formData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleLinkClick = () => setIsMenuOpen(false);


  return (
    <>
      <header>
        <div className="HeaderTop HeaderTop_Host">
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
        <div className="HeaderBottom HeaderBottom_Host">
          <div className="container">
            <div className={`MenuToggle ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <button className="Toggle_mode Toggle_mode_host" onClick={() => { setIsHost(false) }}>
              <img className="Toggle_mode_img" src="/m3.png" alt="" />
              <p>食べる人モード切替</p>
              <img className="arrow" src="/arrow2.png" alt="" />
            </button>


          </div>

          <div className={`Header_menu ${isMenuOpen ? "open" : "close"}`}>
            <ul className='Header_menu_list'>
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  <img src="/4.png" alt="カレンダーアイコン" />
                  <p className='Header_menu_list_title'>１週間の献立一覧</p>
                </Link>
              </li>
              <li>
                <Link to="/shopping-list" onClick={handleLinkClick}>
                  <img src="/5.png" alt="買い物かごアイコン" />
                  <p className='Header_menu_list_title'>買い出しリスト</p>
                </Link>
              </li>
              <li>
                <div className="header_box">
                  <img src="/6.png" alt="歯車アイコン" />
                  <p className='Header_menu_list_title'>設定</p>
                </div>
                <ul>
                  <li>
                    <Link to="/MenuEdit1" onClick={handleLinkClick}>
                      <p className='Header_menu_list_settingtitle'>料理の材料を編集</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/creator-signup"
                      state={{ step: 2, formData: formData }}
                      onClick={handleLinkClick}
                    >
                      <p className='Header_menu_list_settingtitle'>設定やり直し<br /><span>（料理バランス、作れるメニュー、投票締め切り曜日の変更、家族を招待）</span></p>
                    </Link>
                  </li>

                </ul>
              </li>
            </ul>

            <div className="Header_menu_apptitle">
              <img src="/app.png" alt="アプリのアイコン" />
              <p>だれか決めて！<br />
                晩ごはん</p>
            </div>
          </div>
        </div>
      </header>




    </>
  )
}

export default Header_Host