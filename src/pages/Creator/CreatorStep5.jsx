import { useNavigate } from 'react-router-dom';
import './CreatorStep.css';
import { useState } from 'react';
import { auth, db } from "../../firebase";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";


const CreatorStep5 = ({ formData, onFinish }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);


  const inviteUrl = "http：//ｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗｗ";


  const copyBaseMenuToUser = async (userId) => {
    const userMenuRef = collection(db, "users", userId, "menus");

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists() && userSnap.data().copied) {
      console.log("すでにコピー済みです");
      return;
    }
    const baseMenusSnap = await getDocs(collection(db, "baseMenus"));
    const promises = baseMenusSnap.docs.map((docSnap) =>
      setDoc(doc(userMenuRef, docSnap.id), docSnap.data())
    );
    await Promise.all(promises);
    await setDoc(userRef, { copied: true }, { merge: true });
    console.log("baseMenus コピー完了");
  };

  const copyIngredientsToUser = async (userId) => {
    const userIngredientsRef = collection(db, "users", userId, "ingredients");
    const ingredientsSnap = await getDocs(collection(db, "ingredients"));
    const promises = ingredientsSnap.docs.map((docSnap) =>
      setDoc(doc(userIngredientsRef, docSnap.id), docSnap.data())
    );
    await Promise.all(promises);
    console.log("ingredients コピー完了")
  };

  const copyAvailableMenus = async (userId, selectMenus) => {

    const promises = selectMenus.map((menu) => {
      const parentMenuId = menu.baseMenuId || `custom-${Date.now()}`;
      const availableMenusRef = collection(
        db,
        "users",
        userId,
        "menus",
        parentMenuId,
        "availableMenus"
      );
      const docData={
        name:menu.name,
        category:menu.category,
        ingredients:menu.ingredients||[],
        isCustom:menu.isCustom||false,
      }
      return setDoc(doc(availableMenusRef, menu.name), docData);
    });

    await Promise.all(promises);
    console.log("availableMenus コピー完了");
  };


  const saveSetupData = async (userId, formData) => {
    await setDoc(doc(db, "users", userId, "setup", "info"), {
      mealDays: formData.mealDays,
      fishDays: formData.fishDays,
      otherDays: formData.otherDays,
      voteDeadline: formData.voteDeadline,
      createdAt: new Date(),
    });
    console.log("setup データ保存完了")
  };



  // const handleFinish = () => {
  //   console.log(formData);
  //   onFinish();
  //   navigate('/host');
  // }
  const handleFinish = async () => {
    if (!auth.currentUser) return alert("ログインが必要です");
    const userId = auth.currentUser.uid;

    try {
      await setDoc(doc(db, "users", userId), {
        email: formData.email,
        createdAt: new Date(),
      }, { merge: true });
      await saveSetupData(userId, formData);

      await copyBaseMenuToUser(userId);
      await copyIngredientsToUser(userId);

      if(formData.selectMenus){
        await copyAvailableMenus(userId,formData.selectMenus);
      }

      console.log("ユーザー用データ作成完了");
      onFinish();
      navigate('/host');
    }
    catch (error) {
      console.error("データコピー失敗:", error);
      alert("エラーが発生しました")
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
      .then(() => setCopied(true))
      .catch(() => alert("コピーできませんでした。"));

    setTimeout(() => setCopied(false), 2000);
  }

  const handleLine = () => {
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(inviteUrl)}`
    window.open(lineUrl, '_blank');
  }

  return (
    <div className="CreateStep5">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <img className="CreateStep_stepimg" src="/step4.png" alt="ステップ" />
          <h3>家族投票を行うために、家族とアプリを共有しよう。</h3>

          <p className="CreateStep_tex1">下記のURLを家族に送って、アプリをインストールし、家族と共有しよう。</p>

          <div className="introduction_box">
            <p className="introduction_url">{inviteUrl}</p>
            <div className="introduction_box_inner">
              <button onClick={handleCopy} className='appbutton3'>{copied ? "コピーしました" : "コピー"}</button>
              <button onClick={handleLine} className='appbutton3'>LINEで送る</button>
            </div>
          </div>
          <button className='CreateStepbutton' onClick={handleFinish}>完了する</button>

        </div>
      </div>
    </div>
  )
}

export default CreatorStep5