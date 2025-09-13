




const Header_Gest = ({setIsHost}) => {



  return (
    <>
      <header>
        <div className="HeaderTop HeaderTop_Gest">
          <div className="container">
            <button className="header_app_title">
              <img src="/app.png" alt="アプリのアイコン" />
              <h1>だれか決めて！晩ごはん</h1>
            </button>
            <div className="header_mode">
              <img src="/m2.png" alt="ナイフフォーク" />
              <h2>食べる人モード</h2>
            </div>
          </div>
        </div>
        <div className="HeaderBottom HeaderBottom_Gest">
          <div className="container">
           

            <button 
            className="Toggle_mode Toggle_mode_Gest" 
            onClick={()=>{
              setIsHost(true);
              }}>
              <img className="Toggle_mode_img" src="/m1.png" alt="" />
              <p>作る人モード切替</p>
              <img className="arrow" src="/arrow2.png" alt="" />
            </button>

            
          </div>
          
          
        </div>
      </header>




    </>
  )
}

export default Header_Gest