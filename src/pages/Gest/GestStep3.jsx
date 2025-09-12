import './GestStep.css';


import { useNavigate, useOutletContext } from 'react-router-dom';




const GestStep3 = () => {
  const { menuList,setMenuList,setEditingIndex } = useOutletContext();
  const navigate = useNavigate();


  if (!menuList) {
    return <p>メニューが未選択です</p>
  }

  const handleDeleteclick=(indexToDelete)=>{
    const newmenus=menuList.filter((_,i)=>i!==indexToDelete);
    setMenuList(newmenus)
  }  
  const handleVoteAndNext=()=>{
    if(!menuList||menuList.length===0){
      alert("投票を行ってください。")
      return;
    }
    navigate("/Gest_thanks");
  };
  return (

    <div className="GestStep3">
      <div className="container">
        <div className="GestStep_inner">
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
                  onClick={()=>{
                    setEditingIndex(index);
                    navigate("/",{replace:true});
                  }}>
                    メニューを編集</button>
                  <button
                  onClick={()=>handleDeleteclick(index)}
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
            className='GestStepbutton'>
              投票する
              </button>
            <button 
            className='GestStepbutton2'
            onClick={()=>{
                    navigate("/");
                  }}>
            別日の投票をする</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GestStep3;