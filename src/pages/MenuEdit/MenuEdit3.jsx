
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';



const MenuEdit3 = () => {

  const { selectedMenu } = useOutletContext();
  const [ingredient, setIngredient] = useState(selectedMenu?.ingredients || []);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const ingredientDeleteClick = (index) => {
    const newingredients = ingredient.filter((_, i) => {
      return i !== index;
    })
    setIngredient(newingredients);
  }

  const ingredientAddClick = () => {
    if (!input.trim()) {
      alert('材料入力してください')
      return;
    };
    setIngredient([...ingredient, input]);
    setInput("");
  }

  
  if (!selectedMenu) {
    return <p>メニューが選択されていません</p>
  }

  return (

    <div className="MenuEdit2">
      <div className="container">
        <div className="Step_inner">

          <h3>料理の材料を編集</h3>

          <h4><span>『 {selectedMenu.name} 』</span>の材料を編集</h4>
          <ul>
            {
              ingredient.map((i, index) => (
                <li key={`edit-${i}`}>
                  <p>{i}</p>
                  <button
                    onClick={() => ingredientDeleteClick(index)}
                  >
                    <img src="/8.png" alt="" />
                  </button>
                </li>
              ))
            }
          </ul>
          <div className="MenuEdit3_addbox">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={ingredientAddClick}>追加</button>
          </div>

          <button className='appbutton appbutton1' onClick={()=>navigate("/")}>この変更を保存</button>


          <Link className='Geststep2button2 menuEdit3_nav' to="/MenuEdit2">＜ 料理選択へ戻る</Link>



        </div>

      </div>
    </div>
  );
}

export default MenuEdit3;