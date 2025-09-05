import './CreatorStep.css';

const CreatorStep4 = () => {

  return (
    <div className="CreateStep4">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <img src="/step3.png" alt="ステップ" />
          <h3>家族投票の締め切りは何曜日にする？？</h3>

          <select name="CreateStep4_day_select" >
            <option value="" disabled selected>日付を選択してください</option>
            <option value="monday">月曜日</option>
            <option value="tuesday">火曜日</option>
            <option value="wednesday">水曜日</option>
            <option value="thursday">木曜日</option>
            <option value="friday">金曜日</option>
            <option value="saturday">土曜日</option>
            <option value="sunday">日曜日</option>
          </select>


          <button className='CreateStepbutton'>次へ</button>

        </div>
      </div>
    </div>
  )
}

export default CreatorStep4