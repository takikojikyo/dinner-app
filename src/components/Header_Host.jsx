import { useState } from 'react';

const Header_Host = ({setIsHost}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);


  return (
    <>
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
            <div className={`MenuToggle ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <button className="Toggle_mode" onClick={()=>{setIsHost(false)}}>
              <img className="Toggle_mode_img" src="/m3.png" alt="" />
              <p>食べる人モード切替</p>
              <img className="arrow" src="/arrow2.png" alt="" />
            </button>

            
          </div>
          
          <div className={`Header_menu ${isMenuOpen?"open":"close"}`}>
              <ul className='Header_menu_list'>
                <li>
                  <img src="/4.png" alt="カレンダーアイコン" />
                  <p className='Header_menu_list_title'>１週間の献立一覧</p>
                </li>
                <li>
                  <img src="/5.png" alt="買い物かごアイコン" />
                  <p className='Header_menu_list_title'>買い出しリスト</p>
                </li>
                <li>
                  <img src="/6.png" alt="歯車アイコン" />
                  <p className='Header_menu_list_title'>設定</p>
                  
                  <ul>
                    <li>
                      <p className='Header_menu_list_settingtitle'>料理の材料を編集</p>
                    </li>
                    <li>
                      <p className='Header_menu_list_settingtitle'>料理バランスの変更</p>
                    </li>
                    <li>
                      <p className='Header_menu_list_settingtitle'>作れるメニューの変更</p>
                    </li>
                    <li>
                      <p className='Header_menu_list_settingtitle'>投票締め切り曜日の変更</p>
                    </li>
                    <li>
                      <p className='Header_menu_list_settingtitle'>家族を招待する</p>
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="Header_menu_apptitle">
                <img src="/app.png" alt="アプリのアイコン" />
                <p>だれか決めて！<br/>
                  晩ごはん</p>
              </div>
            </div>
        </div>
      </header>




    </>
  )
}

export default Header_Host