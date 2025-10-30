import { useEffect, useState } from 'react';
import './GestStep.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';


const Gest_thanks = () => {
  const navigate = useNavigate();
  const [selectDay, setSelectDay] = useState("");


  useEffect(() => {
    const fetchVoteDeadline = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = doc(db, "users", user.uid, "setup", "info");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const englishDay = data.voteDeadline; // 例: "Thursday"
          const daysMap = {
            monday: "月曜日",
          tuesday: "火曜日",
          wednesday: "水曜日",
          thursday: "木曜日",
          friday: "金曜日",
          saturday: "土曜日",
          sunday: "日曜日",
          };

          const key = englishDay?.split(" ")[0];
          setSelectDay(daysMap[key] || englishDay);
        }

      } catch (error) {
        console.error(error)
      }
    }
    fetchVoteDeadline();
  }, [])


  return (

    <div className="Gest_thanks">
      <div className="container">
        <div className="Step_inner">

          <img className="gestthanks_img1" src="/g1.png" alt="thankyou" />
          <img className="gestthanks_img2" src="/g2.png" alt="女性" />


          <div className="Gest_thanks_box">
            <h3>{selectDay ? `来週は${selectDay}までに投票してね!` : "読み込み中..."}</h3>
            <button className='GestStepbutton' onClick={() => navigate("/gest")}>
              TOPに戻る
            </button>
          </div>

        </div>

        <img src="/g3.png" alt="女性" />
      </div>
    </div>

  );
}

export default Gest_thanks;