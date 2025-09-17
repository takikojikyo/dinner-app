
import { useState } from 'react';
import './GestStep.css';
import { databaseMenuList } from '../../databaseMenuList';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';



const GestStep2 = () => {
  const { category, menu, setMenu, day, setDay, menuList, setMenuList, editingIndex, setEditingIndex } = useOutletContext();
  const navigate = useNavigate();

  const handleAdd = (item, day) => {
    if (!menu || !day || !menu.name) {
      alert("メニューと曜日を選択してください。")
      return;
    }

    if (editingIndex !== null) {
      const updateList = [...menuList];
      updateList[editingIndex] = { menu: item, day };
      setMenuList(updateList);
      setEditingIndex(null);
    } else {
      setMenuList([...menuList, { menu: item, day }]);
    }

    navigate("/GestStep3");
  };

  const [openIndex, setOpenIndex] = useState(null);
  const toggleGestStepMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const filteredMenu = databaseMenuList.filter(item => item.category === category);

  return (

    <div className="GestStep2">
      <div className="container">
        <div className="Step_inner">
          <img className="GestStep_stepimg" src="/gstep2.png" alt="ステップ" />
          <h3>来週食べたい料理に投票しよう！</h3>

          <h4>投票一覧</h4>

          {
            filteredMenu.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`Geststep2_button ${openIndex === index ? "open" : ""}`}
                role="button" // アクセシビリティ的にボタン扱い 
                tabIndex={0}
              >
                <div className="Geststep2_button_box"
                  onClick={() => {
                    toggleGestStepMenu(index);
                    setMenu(item);
                  }}>
                  <p>{item.name}</p>
                  <img src="/arrow3.png" alt="矢印" />
                </div>
                {openIndex === index && (
                  <div className="Geststep2_button_hide"
                    onChange={e => setDay(e.target.value)}
                  >
                    <p>何曜日に投票しますか？？</p>
                    <select name="GestStep2_day_select" defaultValue="default" >
                      <option value="default">日付を選択してください</option>
                      <option value="月曜日">月曜日</option>
                      <option value="火曜日">火曜日</option>
                      <option value="水曜日">水曜日</option>
                      <option value="木曜日">木曜日</option>
                      <option value="金曜日">金曜日</option>
                      <option value="土曜日">土曜日</option>
                      <option value="日曜日">日曜日</option>
                    </select>

                    <button className='GestStepbutton GestStep2button1' onClick={() => handleAdd(menu, day)}>投票に追加</button>
                  </div>
                )}
              </div>
            ))
          }



          <Link className='Geststep2button2' to="/">＜ カテゴリ選択へ戻る</Link>
        </div>

      </div>
    </div>
  );
}

export default GestStep2;