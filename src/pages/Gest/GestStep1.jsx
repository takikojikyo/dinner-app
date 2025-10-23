
import { useNavigate, useOutletContext } from 'react-router-dom';
import './GestStep.css';
import { useEffect, useState } from 'react';
import { getWeekId } from './GetWeekId';



const GestStep1 = () => {
  const { setCategory } = useOutletContext();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [canVote, setCanVote] = useState(true);

const key=location.key;
  useEffect(() => {
    const currentWeekId = getWeekId(0);
    const nextWeekId = getWeekId(1);

    const updateMessage = () => {
    let votedWeeks = JSON.parse(localStorage.getItem("votedWeeks") || "[]");
    votedWeeks = votedWeeks.filter(w => w === currentWeekId || w === nextWeekId);
    localStorage.setItem("votedWeeks", JSON.stringify(votedWeeks));

    const hasCurrentWeekVote = votedWeeks.includes(currentWeekId);
    const hasNextWeekVote = votedWeeks.includes(nextWeekId);

    if (hasCurrentWeekVote && hasNextWeekVote) {
      setMessage("投票ありがとう！来週また投票してね。");
      setCanVote(false);
    } else if (hasCurrentWeekVote) {
      setMessage("今週は投票済みだよ。来週分を投票してね！");
      setCanVote(true);
    } else {
      setMessage("食べたい料理は何かな？？");
      setCanVote(true);
    }
  };

  updateMessage();
  }, [key]);



  if (!canVote) {
    return (
      <div className="GestStep1">
        <div className="container">

          <p className="geststep1_message">{message}</p>

          <img className="gestthanks_img1" src="/g1.png" alt="thankyou" />
          <img className="gestthanks_img2" src="/g2.png" alt="女性" />
        </div>
      </div>
    )
  }

  return (

    <div className="GestStep1">
      <div className="container">
        <div className="Step_inner">



          <img className="GestStep_stepimg" src="/gstep1.png" alt="ステップ" />

          <p className="geststep1_message">{message}</p>

          <h3>来週食べたい料理に投票しよう！</h3>

          <h4>料理カテゴリを選択</h4>
          <button className='GestStep1_button GestStep1_button1'
            onClick={() => {
              setCategory("肉");
              navigate("/gest/GestStep2");
            }}
          >
            <div className='GestStep1_button_box'>
              <img className='GestStep1_button_ingredientimg' src="/1.png" alt="肉" />
              <p>肉料理</p>
            </div>
            <img className='GestStep1_button_arrow' src="/arrow4.png" alt="" />
          </button>

          <button className='GestStep1_button GestStep1_button2'
            onClick={() => {
              setCategory("魚");
              navigate("/gest/GestStep2");
            }}
          >
            <div className='GestStep1_button_box'>
              <img className='GestStep1_button_ingredientimg' src="/2.png" alt="魚" />
              <p>魚料理</p>
            </div>
            <img className='GestStep1_button_arrow' src="/arrow4.png" alt="" />
          </button>

          <button className='GestStep1_button GestStep1_button3'
            onClick={() => {
              setCategory("その他");
              navigate("/gest/GestStep2");
            }}
          >
            <div className='GestStep1_button_box'>
              <img className='GestStep1_button_ingredientimg' src="/3.png" alt="卵" />
              <p>その他</p>
            </div>
            <img className='GestStep1_button_arrow' src="/arrow4.png" alt="" />
          </button>



        </div>
      </div>
    </div>
  );
}

export default GestStep1;