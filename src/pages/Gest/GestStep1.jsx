
import { useNavigate, useOutletContext } from 'react-router-dom';
import './GestStep.css';



const GestStep1 = () => {
  const {setCategory}=useOutletContext();
  const navigate=useNavigate();


  return (

    <div className="GestStep1">
      <div className="container">
        <div className="Step_inner">
          <img className="GestStep_stepimg" src="/gstep1.png" alt="ステップ" />
          <h3>来週食べたい料理に投票しよう！</h3>

          <h4>料理カテゴリを選択</h4>
          <button className='GestStep1_button GestStep1_button1'
          onClick={()=>{setCategory("肉");
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
          onClick={()=>{setCategory("魚");
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
          onClick={()=>{setCategory("その他");
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