import { useState } from "react";
import { auth, db } from "../../firebase";
import { collection, getDocs, doc, setDoc, getDoc, writeBatch, } from "firebase/firestore";


const CreatorStep2 = ({ onNext }) => {
  const [mealDays, setMealDays] = useState(0);
  const [fishDays, setFishDays] = useState(0);
  const totalDays = 7;
  const otherDays = totalDays - mealDays - fishDays;
  const remainingDays = totalDays - mealDays;
  const fishOptions = Array.from({ length: remainingDays }, (_, i) => i + 1)
  const [loading, setLoading] = useState(false);

  
  const copyCollectionToUser = async (userId, collectionName) => {
    const userStatusRef = doc(db, "users", userId, "copiedStatus", collectionName);
    const statusSnap = await getDoc(userStatusRef);
    if (statusSnap.exists() && statusSnap.data().copied) {
      console.log(`${collectionName}はすでにコピー済みです`);
      return;
    }

    const srcSnap = await getDocs(collection(db, collectionName));
    const userRef = collection(db, "users", userId, collectionName);
    const batch = writeBatch(db);

    srcSnap.forEach((docsnap) => {
      const destRef = doc(userRef, docsnap.id);
      batch.set(destRef, docsnap.data());
    });
    await batch.commit();
    await setDoc(userStatusRef, { copied: true })
    console.log(`${collectionName} コピー完了`)
  };


  const handleNext = async () => {
    if (mealDays === 0 || fishDays === 0) {
      alert("肉料理、魚料理の日数をチェックしてください。")
      return;
    }
    if (mealDays + fishDays + otherDays !== 7) {
      alert("合計が7日になるように設定してください。");
      return;
    }

    setLoading(true);
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert("ユーザー情報を確認できません。ログインしてください。");
        return;
      }

      await Promise.all([
        copyCollectionToUser(userId, "ingredientsMaster"),
        copyCollectionToUser(userId, "ingredients"),
      ]);

      console.log("すべてのデータコピー完了");

      onNext({
        mealDays,
        fishDays,
        otherDays,
      });

    } catch (error) {
      console.error("材料コピー中にエラー:", error);
      alert("材料データの準備に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }

  };

  const handleMealChange = (n) => {
    setMealDays(n);
    const remaining = totalDays - n;
    if (fishDays > remaining) {
      setFishDays(remaining);
    }
  };


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
          <div className="CreateStep2_box1">
            <fieldset>
              <legend>肉料理の日数を選択</legend>
              <img src="/1.png" alt="肉" />
              <p>肉料理：{mealDays}日</p>
              {[1, 2, 3, 4, 5, 6].map(n => (
                <label key={n}>
                  <input
                    type="radio"
                    name="meat"
                    value={n}
                    checked={mealDays === n}
                    onChange={() => handleMealChange(n)}
                  />
                  {n}日
                </label>
              )
              )}
            </fieldset>
            <fieldset>
              <legend>魚料理の日数を選択</legend>
              <img src="/2.png" alt="魚" />
              <p>魚料理：{fishDays}日</p>
              {fishOptions.map(n => (
                <label key={n}>
                  <input
                    type="radio"
                    name="fish"
                    value={n}
                    checked={fishDays === n}
                    onChange={() => setFishDays(n)}
                  />
                  {n}日
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>その他料理の日数を選択</legend>
              <img src="/3.png" alt="卵" />
              <p>その他：{otherDays}日</p>

            </fieldset>

          </div>
          <button className="CreateStepbutton" onClick={handleNext} disabled={loading}>
            {loading?"コピー中...":"次へ"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default CreatorStep2