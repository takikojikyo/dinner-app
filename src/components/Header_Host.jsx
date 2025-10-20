import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';




const Header_Host = ({ formData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleLinkClick = () => setIsMenuOpen(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      
      if (user) {
        setAuthReady(true);
      } else {
        setAuthReady(false);
      }

      setCheckingAuth(false);

    });
    return () => unsubscribe();
  }, []);


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

            <button className="Toggle_mode Toggle_mode_host" onClick={() => { navigate("/gest") }}>
              <img className="Toggle_mode_img" src="/m3.png" alt="" />
              <p>食べる人モード切替</p>
              <img className="arrow" src="/arrow2.png" alt="" />
            </button>


          </div>

          <div className={`Header_menu ${isMenuOpen ? "open" : "close"}`}>
            <ul className='Header_menu_list'>
              <li>
                <button
                  className="Header_menu_button"
                  onClick={() => {
                    handleLinkClick();
                    navigate("/host");
                  }}
                >
                  <img src="/4.png" alt="カレンダーアイコン" />
                  <p className='Header_menu_list_title'>１週間の献立一覧</p>
                </button>
              </li>
              <li>
                <button
                  className="Header_menu_button"
                  onClick={() => {
                    handleLinkClick();
                    navigate("/host/shopping-list");
                  }}>
                  <img src="/5.png" alt="買い物かごアイコン" />
                  <p className='Header_menu_list_title'>買い出しリスト</p>
                </button>
              </li>
              <li>
                <div className="header_box">
                  <img src="/6.png" alt="歯車アイコン" />
                  <p className='Header_menu_list_title'>設定</p>
                </div>
                <ul>
                  <li>
                    <button
                      className="Header_menu_button"
                      onClick={() => {
                        handleLinkClick();
                        navigate("/host/MenuEdit1");
                      }}>
                      <p className='Header_menu_list_settingtitle'>料理の材料を編集</p>
                    </button>
                  </li>
                  {!checkingAuth && authReady && (
                    <li>
                      <button
                        className="Header_menu_button"
                        onClick={() => {
                          handleLinkClick();
                          navigate("/Creator-signup", { state: { step: 2, formData } })
                        }}>
                        <p className='Header_menu_list_settingtitle'>設定やり直し<br /><span>（料理バランス、作れるメニュー、投票締め切り曜日の変更、家族を招待）</span></p>
                      </button>
                    </li>
                  )}


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