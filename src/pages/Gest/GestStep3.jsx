
import { useState } from 'react';
import './GestStep.css';
import { databaseMenuList } from '../../databaseMenuList';
import { useNavigate, useOutletContext } from 'react-router-dom';




const GestStep3 = () => {
  const { category, menu, setMenu, day, setDay, menuList, setMenuList } = useOutletContext();
  const navigate = useNavigate();

  const handleAdd = () => {
    setMenuList([...menuList, { menu, day }]);
    navigate("/step3");
  };

  const [openIndex, setOpenIndex] = useState(null);
  const toggleGestStepMenu = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const filteredMenu = databaseMenuList.filter(item => item.category === category);

  return (

    <div className="GestStep2">
      <div className="container">
        <div className="GestStep_inner">
          <img className="GestStep_stepimg" src="/step2.png" alt="ステップ" />
          <h3>来週食べたい料理に投票しよう！</h3>

          <h4>食べたい料理を選択。<br />
            曜日を指定して、投票に追加ボタンを押そう。</h4>

          {
            filteredMenu.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`Geststep2_button ${openIndex === index ? "open" : ""}`}
                role="button" // アクセシビリティ的にボタン扱い 
                tabIndex={0}
              >
                <div className="Geststep2_button_box"
                onClick={() => {toggleGestStepMenu(index);
                  setMenu(item);
                }}>
                  <p>{item.name}</p>
                  <img src="/arrow3.png" alt="矢印" />
                </div>
                {openIndex === index && (
                  <div className="Geststep2_button_hide"
                  onChange={e=>setDay(e.target.value)}
                  >
                    <p>何曜日に投票しますか？？</p>
                    <select name="GestStep2_day_select" defaultValue="default" >
                      <option value="default">日付を選択してください</option>
                      <option value="monday">月曜日</option>
                      <option value="tuesday">火曜日</option>
                      <option value="wednesday">水曜日</option>
                      <option value="thursday">木曜日</option>
                      <option value="friday">金曜日</option>
                      <option value="saturday">土曜日</option>
                      <option value="sunday">日曜日</option>
                    </select>
                  </div>
                )}
              </div>
            ))
          }

          <button className='GestStepbutton' onClick={handleAdd}>投票に追加</button>
        </div>

      </div>
    </div>
  );
}

export default GestStep3;