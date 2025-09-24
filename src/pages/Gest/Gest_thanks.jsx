import './GestStep.css';


import { useNavigate, useOutletContext } from 'react-router-dom';




const Gest_thanks = () => {

  const navigate = useNavigate();
  const { setMenuList } = useOutletContext();
  const handleContineVote = () => {
    setMenuList([]);
    navigate("/");
  }

  return (

    <div className="Gest_thanks">
      <div className="container">
        <div className="GestStep_inner">

          <img src="/g1.png" alt="thankyou" />
          <img className="gestthanks_img" src="/g2.png" alt="女性" />

          <div className="Gest_thanks_box">
            <h3>来週は木曜日までに投票してね!</h3>
            <button
              className='GestStepbutton'
              onClick={handleContineVote}>
              続けて投票する
            </button>
          </div>

          <img src="/g3.png" alt="女性" />
        </div>
      </div>
    </div>
  );
}

export default Gest_thanks;