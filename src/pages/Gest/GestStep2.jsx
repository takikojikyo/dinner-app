
import { useState } from 'react';
import './GestStep.css';



const GestStep2 = () => {
  const [isMenuSelect, setIsMenuSelect] = useState(false);
  const MenuSelect = () => setIsMenuSelect(prev => !prev);

  return (

    <div className="GestStep2">
      <div className="container">
        <div className="GestStep_inner">
          <img className="GestStep_stepimg" src="/step2.png" alt="ステップ" />
          <h3>来週食べたい料理に投票しよう！</h3>

          <h4>食べたい料理を選択。<br />
            曜日を指定して、投票に追加ボタンを押そう。</h4>

        <button className={`Geststep2_button ${isMenuSelect?"open":"" }`}>
          <div className="Geststep2_button_box">
            <p>カレー</p>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="Geststep2_button_hide">
            <p>何曜日に投票しますか？？</p>
            <select name="GestStep2_day_select" >
            <option value="" disabled selected>日付を選択してください</option>
            <option value="monday">月曜日</option>
            <option value="tuesday">火曜日</option>
            <option value="wednesday">水曜日</option>
            <option value="thursday">木曜日</option>
            <option value="friday">金曜日</option>
            <option value="saturday">土曜日</option>
            <option value="sunday">日曜日</option>
          </select>
          </div>
        </button>
        </div>

      </div>
    </div>
  );
}

export default GestStep2;