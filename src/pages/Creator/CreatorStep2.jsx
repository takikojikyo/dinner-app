import { useState } from "react";



const CreatorStep2 = () => {
  const [mealDays, setMealDays] = useState(0);
  const [fishDays, setFishDays] = useState(0);
  const totalDays = 7;
  const otherDays = totalDays - mealDays - fishDays;
  const remainingDays = totalDays - mealDays;
  const fishOptions = Array.from({ length: remainingDays }, (_, i) => i + 1)


  return (
    <div className="CreateStep2">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <img className="CreateStep_stepimg" src="/step1.png" alt="ステップ" />
          <h3>1週間の献立バランスを決めよう！</h3>

          <p className="CreateStep_tex1">
            ※合計で7日になるように調整しましょう。
            <br />肉料理：〇日
            <br />魚介類：〇日
            <br />その他（卵・豆・乳製品など）：〇日
          </p>
          <ul className="CreateStep2_box1">
            <li>
              <img src="/1.png" alt="肉" />
              <p>肉料理：{mealDays}日</p>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <label key={n}>
                  <input type="radio" name="meat" value={n} checked={mealDays === n} onChange={() => setMealDays(n)} />
                  {n}日
                </label>
              )
              )}
            </li>
            <li>
              <img src="/2.png" alt="魚" />
              <p>魚料理：{fishDays}日</p>
              {fishOptions.map(n => (
                <label key={n}>
                  <input type="radio" name="fish" value={n} checked={fishDays === n} onChange={() => setFishDays(n)} />
                  {n}日
                </label>
              ))}
            </li>
            <li>
              <img src="/3.png" alt="卵" />
              <p>その他：{otherDays}日</p>

            </li>

          </ul>
          <button className="CreateStepbutton">次へ</button>

        </div>
      </div>
    </div>
  );
}

export default CreatorStep2