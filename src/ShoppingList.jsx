import './ShoppingList.css';
import './HostHome.css';
import { Link } from 'react-router-dom';



const ShoppingList = () => {
  return (
    <div className="container">
      <div className="ShoppingList">

        <div className="section_title">
          <img src="/5.png" alt="買い物かご" />
          <h3>買い出しリスト</h3>
        </div>
        <ul className='ShoppingList_items'>
          <li>
            <div className="ShoppingList_item_title">
              <input type="checkbox" />
              <h3>人参</h3>
            </div>
            <div className="material_list_material_list">
              <h4>◆使用する曜日</h4>
              <p>月：カレーライス</p>
            </div>
          </li>
        </ul>



      </div>

      <Link to="/" className="shopping_list_button">
        <img src="/m3.png" alt="買い物かご" />
        <p>トップへ戻る</p>
      </Link>
    </div>
  )
}

export default ShoppingList