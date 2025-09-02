import './ShoppingList.css';
import './HostHome.css';
import { Link } from 'react-router-dom';
import { week_menus } from '../../menus';
import { useState } from 'react';

const ShoppingList = () => {
  const [checkedItems, setCheckedItems] = useState([]);


  const ingredientMap = {};
  week_menus.forEach((item) => {
    item.ingredients.forEach((ing) => {
      if (!ingredientMap[ing]) {
        ingredientMap[ing] = [];
      }
      ingredientMap[ing].push(`${item.day}:${item.title}`)
    });
  });
  const handleShoppingListClick = (ingredient) => {
    setCheckedItems(prev => {
      if (prev.includes(ingredient)) {
        return prev.filter(i => i !== ingredient);
      } else {
        return [...prev, ingredient];
      }
    })
  }

  const ShoppingList_items = Object.entries(ingredientMap).map(([ingredient, uses]) => (

    <li
      key={ingredient}
      className={checkedItems.includes(ingredient) ? "checked" : ""}
    >
      <div className="ShoppingList_item_title">
        <input type="checkbox"
          checked={checkedItems.includes(ingredient)}
          onChange={() => handleShoppingListClick(ingredient)}
        />
        <h3>{ingredient}</h3>
      </div>
      <div className="material_list_material_list">
        <h4>◆使用する曜日</h4>
        {uses.map((u) => (
          <p key={`${ingredient}-${u}`}>{u}</p>
        ))}

      </div>
    </li>
  ));



  return (
    <div className="container">
      <div className="ShoppingList">

        <div className="section_title">
          <img src="/5.png" alt="買い物かご" />
          <h3>買い出しリスト</h3>
        </div>
        <ul className='ShoppingList_items'>
          {ShoppingList_items}
        </ul>



      </div>

      <Link to="/" className="shopping_list_button">
        <img src="/m3.png" alt="買い物かご" />
        <p>トップへ戻る</p>
      </Link>
    </div>
  )
}

export default ShoppingList;