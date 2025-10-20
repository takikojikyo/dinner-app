import { useState } from 'react';
import './CreatorStep.css';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';


const CreatorStep4 = ({ onNext }) => {
  const [selectDay, setSelectDay] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setSelectDay(e.target.value);
  }
  const handleSubmit = async () => {
    if (!selectDay) {
      alert("曜日を選択してください。")
      return;
    }
    setLoading(true);

    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert("ユーザー情報を確認できません。ログインしてください。");
        return;
      }

      const setupRef = doc(db, "users", userId, "setup", "info");
      await setDoc(setupRef, {
        voteDeadline: selectDay,
        step4setup: true,
        updatedAt: serverTimestamp(),
      }, { merge: true });
      console.log("step4データ保存完了");
      onNext({ voteDeadline: selectDay })
    }catch(error){
      console.error("データ保存エラー:", error);
      alert("保存中にエラーが発生しました。もう一度お試しください。")
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <div className="CreateStep4">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <img className="CreateStep_stepimg" src="/step3.png" alt="ステップ" />
          <h3>家族投票の締め切りは何曜日にする？？</h3>

          <select
            name="CreateStep4_day_select"
            value={selectDay}
            onChange={handleChange}
          >
            <option value="" disabled>日付を選択してください</option>
            <option value="monday">月曜日</option>
            <option value="tuesday">火曜日</option>
            <option value="wednesday">水曜日</option>
            <option value="thursday">木曜日</option>
            <option value="friday">金曜日</option>
            <option value="saturday">土曜日</option>
            <option value="sunday">日曜日</option>
          </select>


          <button 
          className='CreateStepbutton' 
          onClick={handleSubmit}
          disabled={loading}
          >
            {loading?"保存中...":"次へ"}
          </button>

        </div>
      </div>
    </div>
  )
}

export default CreatorStep4