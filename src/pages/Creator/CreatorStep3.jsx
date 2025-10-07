import { useEffect, useState } from 'react';
import './CreatorStep.css';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase';



// const MENU_ITEMS = {
//   meat: [
//     "すき焼き",
//     "チャプチェ",
//     "ビーフシチュー",
//     "プルコギ丼",
//     "肉うどん",
//     "牛肉とピーマンの甘辛炒め",
//     "牛丼",
//     "ホイコーロー",
//     "カレー",
//     "ハッシュドビーフ",
//     "ハヤシライス",
//     "肉じゃが",
//     "生姜焼き",
//     "豚肉のジューシーピカタ",
//     "豚キムチ",
//     "とんぺい焼き",
//     "豚肉と白菜の重ね蒸し",
//     "豚肉ともやしのレンジ蒸し",
//     "トンテキ",
//     "トンカツ",
//     "豚の角煮",
//     "酢豚",
//     "肉巻き",
//     "お好み焼き",
//     "焼きそば",
//     "焼きうどん",
//     "鍋",
//     "クリームシチュー",
//     "唐揚げ",
//     "親子丼",
//     "親子煮",
//     "油淋鶏唐揚げ",
//     "照り焼きチキン",
//     "チキン南蛮",
//     "鶏もも肉とほうれん草のクリーム煮",
//     "チキングラタン",
//     "チキンソテー",
//     "サラダチキン",
//     "バンバンジー",
//     "チャーシュー",
//     "チキンライス",
//     "タコライス",
//     "ガパオライス",
//     "キーマカレー",
//     "マーボーナス",
//     "ロールキャベツ",
//     "ハンバーグ",
//     "ミートボール",
//     "ミンチカツ",
//     "ピーマン肉詰め",
//     "ミートソーススパゲッティ",
//     "ビビンバ丼",
//     "餃子",
//     "コロッケ",
//     "三色丼",
//     "豆腐ハンバーグ",
//     "鶏そぼろ丼",
//     "照り焼きつくね",
//     "鶏団子の甘酢あんかけ",
//     "ポトフ",
//     "ナポリタンスパゲッティ",
//     "ミネストローネ",
//     "ミックスピザ",
//     "ラーメン",
//   ],
//   fish: [
//     "お刺身",
//     "まぐろとろろ丼",
//     "鮭の塩焼き",
//     "鮭のちゃんちゃん焼き",
//     "鮭のムニエル",
//     "鮭の西京焼き",
//     "鮭のホイル焼き",
//     "鮭とじゃがいものグラタン",
//     "鮭とほうれん草のクリーム煮",
//     "サーモンのカルパッチョ",
//     "サバの塩焼き",
//     "サバの味噌煮",
//     "サバの煮付け",
//     "さば缶カレー",
//     "さんまの塩焼き",
//     "ぶりの照り焼き",
//     "ぶり大根",
//     "カツオのたたき",
//     "あじの塩焼き",
//     "あじフライ",
//     "あじの南蛮漬け",
//     "いわしの蒲焼き",
//     "いわしの梅煮",
//     "さわらのバターしょうゆ焼き",
//     "さわらの西京焼き",
//     "たらのムニエル",
//     "たらのホイル焼き",
//     "たらのチーズピカタ",
//     "鯛のカルパッチョ",
//     "鯛のアクアパッツァ",
//     "鯛の煮付け",
//     "白身魚のフライ",
//     "白身魚の甘酢あんかけ",
//     "カレイの煮つけ",
//     "パエリア",
//     "シーフードカレー",
//     "いかと大根の煮物",
//     "いかのマリネ",
//     "えびフライ",
//     "えびチリ",
//     "えびマヨネーズ",
//     "海老ピラフ",
//     "えびのクリームパスタ",
//     "たこ焼き",
//     "あさりの酒蒸し",
//     "あさりの和風スパゲティ",
//     "クラムチャウダー",
//     "明太子のパスタ",
//   ],
//   other: [
//     "おでん",
//     "チーズオムレツ",
//     "スパニッシュオムレツ",
//     "オムライス",
//     "だし巻き卵",
//     "ニラ玉",
//     "かに玉炒め",
//     "天津飯",
//     "スコッチエッグ",
//     "麻婆豆腐",
//     "肉豆腐",
//     "湯豆腐",
//     "豆腐ステーキ",
//     "ゴーヤチャンプル",
//     "シーフードグラタン",
//     "ソーセージとポテトのチーズ焼き",
//   ],
// };

const DishList = ({ title, icon, dishes, selected, onToggle }) => (

  <div className="CreateStep3_box1">
    <div className="CreateStep3_title">
      <img src={icon} alt={title} />
      <h3>{title}</h3>
    </div>
    <ul className='CreateStep3_list'>
      {dishes.map((dish, index) => (
        <li key={`dish-${index}`}>
          <input
            type="checkbox"
            checked={selected.some(s => s.name === dish.name && s.category === dish.category)}
            onChange={() => onToggle(dish)} />
          <p>{dish.name}</p>
        </li>
      ))}

    </ul>
  </div>

)

const CreatorStep3 = ({ mealDays, fishDays, otherDays, onNext }) => {

  const [mealType, setMealType] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectMenus, setSelectMenus] = useState([]);
  const [baseMenus, setBaseMenus] = useState({ 肉: [], 魚: [], その他: [] })


  useEffect(() => {
    const fetchBaseMenus = async () => {
      const snapshot = await getDocs(collection(db, "baseMenus"));
      const menus = { 肉: [], 魚: [], その他: [] };

      snapshot.docs.forEach(docSnap => {
        const data = docSnap.data();
        if (data.category && menus[data.category]) {
          menus[data.category].push({ ...data, isCustom: false, category: data.category });
        }
      });
      setBaseMenus(menus);
    };
    fetchBaseMenus();
  }, []);


  const categoryNames = {
    肉: "肉料理",
    魚: "魚料理",
    その他: "その他料理",
  };

  const handleToggle = (dish) => {
    setSelectMenus(prev =>
      prev.some(d => d.name === dish.name && d.category === dish.category)
        ? prev.filter(d => !(d.name === dish.name && d.category === dish.category))
        : [...prev, dish]
    );
  };

  const handleAddIngredient = () => {
    if (customIngredient.trim() !== "") {
      setIngredients((prev) => [...prev, customIngredient.trim()]);
      setCustomIngredient("");
    }
  };

  const handleRegisterMenu = () => {
    if (!customTitle || !mealType || ingredients.length === 0) {
      alert("メニュー名、カテゴリ、材料をすべて入力してください。")
      return;
    }

    const newMenu = {
      name: customTitle,
      category: mealType,
      ingredients,
      isCustom: true,
    };

    setSelectMenus((prev) => [...prev, newMenu]);
    setCustomTitle("")
    setMealType("");
    setIngredients([]);
  };

  const handleNext = async() => {
    const meatCount = selectMenus.filter(m => m.category === "肉").length;
    const fishCount = selectMenus.filter(m => m.category === "魚").length;
    const otherCount = selectMenus.filter(m => m.category === "その他").length;

    const customCounts = selectMenus.filter(m => m.isCustom)
      .reduce((acc, menu) => {
        if (menu.category === "肉") acc.meat++;
        else if (menu.category === "魚") acc.fish++;
        else if (menu.category === "その他") acc.other++;
        return acc;
      }, { 肉: 0, 魚: 0, その他: 0 });

    const totalMeat = meatCount + customCounts.肉;
    const totalFish = fishCount + customCounts.魚;
    const totalOther = otherCount + customCounts.その他;

    if (totalMeat < mealDays || totalFish < fishDays || totalOther < otherDays) {
      alert("前ステップで選んだ日数分、各カテゴリを選択してください")
      return;
    }

    const userId=auth.currentUser.uid;
    const availableMenusRef=collection(db,"users",userId,"availableMenus");

    try{
      const batch=selectMenus.map(menu=>
        addDoc(
          availableMenusRef,{
            name:menu.name,
            category:menu.category,
            ingredients:menu.ingredients||[],
            isCustom:menu.isCustom||false
          })
      );
      await Promise.all(batch);
      onNext({ selectMenus});
    }catch(error){
      console.error(error);
      alert("メニュー保存に失敗しました");
    }
    
  };

  return (
    <div className="CreateStep3">
      <div className="container">
        <img className="CreateStep-img" src="/p1.png" alt="" />

        <div className="CreateStep_inner">
          <img className="CreateStep_stepimg" src="/step2.png" alt="ステップ" />
          <h3>あなたが作れるメニューは何？？</h3>

          <DishList title="肉料理" icon="/1.png" dishes={baseMenus.肉} selected={selectMenus} onToggle={handleToggle} />
          <DishList title="魚料理" icon="/2.png" dishes={baseMenus.魚} selected={selectMenus} onToggle={handleToggle} />
          <DishList title="その他料理" icon="/3.png" dishes={baseMenus.その他} selected={selectMenus} onToggle={handleToggle} />




          <div className="CreateStep3_box2">
            <div className="CreateStep3_box2_item1">
              <h4>自分でメニューを登録</h4>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder='メニュー名' />
            </div>
            <div className="CreateStep3_box2_item2">
              <h4>料理カテゴリ</h4>
              <select
                className='CreateStep3_meal_type'
                value={mealType}
                onChange={e => setMealType(e.target.value)}
              >
                <option value="" disabled>カテゴリを選択</option>
                <option value="肉">肉料理</option>
                <option value="魚">魚料理</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div className="CreateStep3_box2_item3">
              <h4>材料</h4>
              <input
                type="text"
                placeholder="材料を入力"
                value={customIngredient}
                onChange={(e) => setCustomIngredient(e.target.value)}
              />

              <div className="CreateStep3_box2_button_area">
                <button
                  className='CreateStep3_box2_button1 appbutton3'
                  onClick={handleAddIngredient}
                >
                  材料を追加
                </button>
                <button
                  className='CreateStep3_box2_button2 appbutton4'
                  onClick={handleRegisterMenu}
                >
                  メニューを登録
                </button>
              </div>


            </div>

          </div>

          <div className="CreateStep3_selected_menus">
            {selectMenus.length > 0 && <h4>選択済みメニュー</h4>}

            {/* 肉料理 */}
            {selectMenus.filter(m => m.category === "肉").length > 0 && (
              <div>
                <h5>◆肉料理</h5>
                <ul>
                  {selectMenus.filter(m => m.category === "肉")
                    .map((menu, index) => (
                      <li key={`meat-${index}-${menu.name}`}>
                        <p>{menu.name}</p>
                        {/* {!menu.isCustom && menu.ingredients.length > 0 && (
                          <span>({menu.ingredients.join(",")})</span>
                        )} */}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {/* 魚料理 */}
            {selectMenus.filter(m => m.category === "魚").length > 0 && (
              <div>
                <h5>◆魚料理</h5>
                <ul>
                  {selectMenus.filter(m => m.category === "魚")
                    .map((menu, index) => (
                      <li key={`fish-${index}-${menu.name}`}>
                        <p>{menu.name}</p>
                        {/* {!menu.isCustom && menu.ingredients.length > 0 && (
                          <span>({menu.ingredients.join(",")})</span>
                        )} */}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {/* その他料理 */}
            {selectMenus.filter(m => m.category === "その他").length > 0 && (
              <div>
                <h5>◆その他料理</h5>
                <ul>
                  {selectMenus.filter(m => m.category === "その他")
                    .map((menu, index) => (
                      <li key={`other-${index}-${menu.name}`}>
                        <p>{menu.name}</p>
                        {/* {!menu.isCustom && menu.ingredients.length > 0 && (
                          <span>({menu.ingredients.join(",")})</span>
                        )} */}
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {/* 自分で追加したメニュー */}
            {selectMenus.filter(m => m.isCustom).length > 0 && (
              <div>
                <h5>◆自分で追加したメニュー</h5>
                <ul>
                  {selectMenus.filter(m => m.isCustom)
                    .map((menu, index) => (
                      <li key={`custom-${index}-${menu.name}`}>
                        <p>{menu.name}</p>
                        <span>[{categoryNames[menu.category]}]</span>
                        <span>({menu.ingredients.join(",")})</span>
                      </li>
                    ))}
                </ul>
              </div>
            )}

          </div>

          <button className="CreateStepbutton" onClick={handleNext}>次へ</button>



        </div>
      </div>
    </div >
  )
}

export default CreatorStep3