import { collection, addDoc, where, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './GestStep.css';
import {  useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useState } from 'react';



const GestStep3 = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { menuList,gestId, setMenuList, setEditingIndex } = useOutletContext();

  // const { hostId } = useParams();
  const { hostId: paramHostId } = useParams();
  const hostId = paramHostId || "TEST_HOST_ID";

  if (!menuList || menuList.length === 0) {
    return <p>メニューが未選択です</p>;
  }

  const handleDeleteclick = (index) => {
    const newmenus = menuList.filter((_, i) => i !== index);
    setMenuList(newmenus)
  }

    const handleEdit = (index) => {
    setEditingIndex(index);
    navigate("/gest/GestStep2"); // Step2に戻る
  };

  const handleVoteAndNext = async () => {
    if (!gestId) {
      console.error("guestIdがまだ未設定です");
      alert("通信準備中です。少し待ってからもう一度お試しください。");
      return;
    }

    const storedWeekId=localStorage.getItem("currentWeekId");
    const now = new Date();
    const year = now.getFullYear();
    const weekNumber = Math.ceil((now.getDate() - now.getDay() + 1) / 7);
    const weekId = storedWeekId||`${year}-${weekNumber}`;

    setLoading(true);
    try {
      const votesRef = collection(db, "weeklyPlans", hostId, "week", weekId, "votes");
      const q = query(votesRef, where("gestId", "==", gestId));
      const snap = await getDocs(q);
      if (!snap.empty) {
        alert("この週はすでに投票済みです。");
        return;
      }
      for (const item of menuList) {
        await addDoc(votesRef, {
          gestId,
          menuId: item.menu?.id || null,
          menuName: item.menu?.name || "不明なメニュー",
          day: item.day || "曜日未選択",
          createdAt: new Date(),
        });
      }

      alert("投票を保存しました！");
      navigate("/gest/Gest_thanks");

    } catch (error) {
      console.error(error);
      alert("投票に失敗しました");
    } finally {
      setLoading(false);
    }


  };
  return (

    <div className="GestStep3">
      <div className="container">
        <div className="Step_inner">
          <img className="GestStep_stepimg" src="/gstep3.png" alt="ステップ" />
          <h3>来週食べたい料理に投票しよう！</h3>

          <h4>投票一覧</h4>

          {menuList.map((selectitem, index) => (
            <ul key={index}>
              <li>
                <h4><span>メニュー名：</span>{selectitem.menu.name || "未選択"}</h4>
                <p>選択曜日：{selectitem.day || "曜日未選択"}</p>
                <div className="Geststep3_box1">
                  <button
                    className='GestStep3_button1'
                    onClick={() => {handleEdit(index)}}>
                    メニューを編集</button>
                  <button
                    onClick={() => handleDeleteclick(index)}
                  >
                    <img src="/8.png" alt="ゴミ箱" />
                    ゴミ箱
                  </button>
                </div>
              </li>
            </ul>

          ))}


          <div className="Geststep3_box2">
            <button
              onClick={handleVoteAndNext}
              className='GestStepbutton'
              disabled={loading}
            >
              {loading ? "送信中" : "投票する"}
            </button>
            <button
              className='GestStepbutton2'
              onClick={() => {
                navigate("/gest");
              }}>
              別日の投票をする</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestStep3;