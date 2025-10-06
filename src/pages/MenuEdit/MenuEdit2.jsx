
import { databaseMenuList } from '../../databaseMenuList';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';



const MenuEdit2 = () => {
  const {category,setSelectedMenu} = useOutletContext();
  const navigate = useNavigate();



  const filteredMenu = databaseMenuList.filter(item => item.category === category);

  const handleMenuClick=(item)=>{
    setSelectedMenu(item);
    navigate("/host/MenuEdit3");
  }

  return (

    <div className="MenuEdit2">
      <div className="container">
        <div className="Step_inner">
          
          <h3>料理の材料を編集</h3>

          <h4>メニューを選択</h4>

          {filteredMenu.length===0&&<p>このカテゴリにはメニューがありません</p>}
          {
            filteredMenu.map((item,index) => (
              <button
                key={`${item.id}-${index}`}
                className="Geststep2_button"
                tabIndex={0}
                onClick={()=>handleMenuClick(item)} 
              >
                <div className="Geststep2_button_box">
                  <p>{item.name}</p>
                  <img src="/arrow4.png" alt="矢印" />
                </div>

              </button>
            ))
          }



          <Link className='Geststep2button2' to="/host/MenuEdit1">＜ カテゴリ選択へ戻る</Link>
        </div>

      </div>
    </div>
  );
}

export default MenuEdit2;