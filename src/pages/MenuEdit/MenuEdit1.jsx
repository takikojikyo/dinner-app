
import { useNavigate, useOutletContext } from 'react-router-dom';
import './MenuEdit.css';



const MenuEdit1 = () => {
  const {setCategory}=useOutletContext();
  const navigate=useNavigate();


  return (

    <div className="MenuEdit1">
      <div className="container">
        <div className="Step_inner">
          <h3>料理の材料を編集</h3>
          <h4>料理のカテゴリを選んでください。</h4>

          <button className='GestStep1_button GestStep1_button1'
          onClick={()=>{setCategory("肉");
            navigate("/MenuEdit2");
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
            navigate("/MenuEdit2");
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
            navigate("/MenuEdit2");
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

export default MenuEdit1;