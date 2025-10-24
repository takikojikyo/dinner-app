import { useEffect, useState } from 'react';
import './CreatorStep.css';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import * as wanakana from 'wanakana';
import { onAuthStateChanged } from 'firebase/auth';

const DishList = ({ title, icon, dishes, selected, onToggle, days }) => (

  <div className="CreateStep3_box1">
    <div className="CreateStep3_title">
      <img src={icon} alt={title} />
      <h3>{title}</h3>
    </div>
    <h4 className='CreateStep3_comment'>※{days}個以上はチェックしてね！</h4>
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

const IngredientsInput = ({ ingredients, setIngredients, customIngredient, setCustomIngredient, handleRegisterMenu, allIngredients, setAllIngredients, filteredSuggestions, setFilteredSuggestions }) => {

  // const [allIngredients, setAllIngredients] = useState([]);
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  useEffect(() => {
    const fetchIngredientMaster = async (userId) => {
      //   const snapshot = await getDocs(collection(db, "ingredientsMaster"));
      //   const data = snapshot.docs.map(docSnap => {
      //     const d = docSnap.data();
      //     return {
      //       name: d.name,
      //       aliases: d.aliases || []
      //     };
      //   });
      //   setAllIngredients(data);
      // }
      // fetchIngredientMaster();
      try {
        const commonSnap = await getDocs(collection(db, "ingredientsMaster"));
        const commonData = commonSnap.docs.map(docSnap => {
          const d = docSnap.data();
          return { name: d.name, aliases: d.aliases || [] }
        });

        const userSnap = await getDocs(collection(db, "users", userId, "ingredientsMaster"));
        const userData = userSnap.docs.map(docSnap => {
          const d = docSnap.data();
          return { name: d.name, aliases: d.aliases || [] }
        });
        setAllIngredients([...commonData, ...userData]);
      } catch (error) {
        console.error("材料取得失敗:", error);
      }
    };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      fetchIngredientMaster(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (customIngredient.trim() === "") {
      setFilteredSuggestions([]);
      return;
    }

    const inputHira = wanakana.toHiragana(customIngredient.trim());
    const filtered = allIngredients.filter(item => {
      const nameHira = wanakana.toHiragana(item.name);
      const nameMatch = nameHira.startsWith(inputHira);
      const aliasesMatch = item.aliases.some(
        alias => wanakana.toHiragana(alias) === inputHira
      );
      return nameMatch || aliasesMatch;
    });

    setFilteredSuggestions(filtered);
  }, [customIngredient, allIngredients]);

  const handleAddIngredient = async (selected) => {
    if (!selected) return;
    const name = selected.name.trim();
    if (!name) return;

    const exists = allIngredients.some(i => i.name === name);
    if (ingredients.includes(name)) {
      alert("すでに追加されています")
      return;
    }

    if (!exists) {
      try {
        const userId = auth.currentUser.uid;
        const safeId = encodeURIComponent(name);
        await setDoc(doc(db, "users", userId, "ingredientsMaster", safeId), { name, aliases: [] });
        await setDoc(doc(db, "users", userId, "ingredients", safeId), { name });

        setAllIngredients(prev => [...prev, { name, aliases: [] }]);
        setIngredients(prev => [...prev, name]);


      } catch (error) {
        console.error("材料追加失敗:", error);
        alert("材料の追加に失敗しました");
      }
    }
    setCustomIngredient("");
    setFilteredSuggestions([]);


  };


  return (


    <div className="CreateStep3_box2_item3">
      <h4>材料</h4>
      <input
        type="text"
        placeholder="材料を入力"
        value={customIngredient}
        onChange={(e) => setCustomIngredient(e.target.value)}
      />
      {
        filteredSuggestions.length > 0 && (
          <ul className='autocomplete-suggestions'>
            {
              filteredSuggestions.map((item, index) => (
                <li
                  key={`ingredient-${index}`}
                  className='suggestion-item'
                  onClick={() => handleAddIngredient(item)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        )}

      {ingredients.length > 0 && (
        <div className='current-ingredients-box'>
          <h4>選択済み材料</h4>
          <ul className='current-ingredients'>
            {
              ingredients.map((item, index) => (
                <li key={`ingredient-${index}`}>{item}</li>
              ))}
          </ul>
        </div>
      )}

      <div className="CreateStep3_box2_button_area">
        <button
          className='CreateStep3_box2_button1 appbutton3'
          onClick={() => handleAddIngredient({ name: customIngredient.trim(), aliases: [] })}
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

  );

};




const CreatorStep3 = ({ onNext }) => {

  const [mealType, setMealType] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectMenus, setSelectMenus] = useState([]);
  const [baseMenus, setBaseMenus] = useState({ 肉: [], 魚: [], その他: [] })
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);


  const [mealDays, setMealDays] = useState(0);
  const [fishDays, setFishDays] = useState(0);
  const [otherDays, setOtherDays] = useState(0);



  useEffect(() => {
    const fetchSetupInfo = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const setupRef = doc(db, "users", user.uid, "setup", "info");
        const snapshot = await getDoc(setupRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          setMealDays(data.mealDays || 0);
          setFishDays(data.fishDays || 0);
          setOtherDays(data.otherDays || 0);
        } else {
          setMealDays(0);
          setFishDays(0);
          setOtherDays(0);
        }
      } catch (error) {
        console.error("セットアップ情報の取得に失敗:", error)
      }
    }

    fetchSetupInfo();
  }, []);
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

  // const handleAddIngredient = () => {
  //   if (customIngredient.trim() !== "") {
  //     setIngredients((prev) => [...prev, customIngredient.trim()]);
  //     setCustomIngredient("");
  //   }
  // };

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

  const handleNext = async () => {
    const meatCount = selectMenus.filter(m => m.category === "肉").length;
    const fishCount = selectMenus.filter(m => m.category === "魚").length;
    const otherCount = selectMenus.filter(m => m.category === "その他").length;

    const customCounts = selectMenus.filter(m => m.isCustom)
      .reduce((acc, menu) => {
        acc[menu.category]++;
        // if (menu.category === "肉") acc.meat++;
        // else if (menu.category === "魚") acc.fish++;
        // else if (menu.category === "その他") acc.other++;
        return acc;
      }, { 肉: 0, 魚: 0, その他: 0 });

    const totalMeat = meatCount + customCounts.肉;
    const totalFish = fishCount + customCounts.魚;
    const totalOther = otherCount + customCounts.その他;

    if (totalMeat < mealDays || totalFish < fishDays || totalOther < otherDays) {
      alert("前ステップで選んだ日数分、各カテゴリを選択してください")
      return;
    }

    const user = auth.currentUser;
    if (!user) return;
    const userId = user.uid;
    const availableMenusRef = collection(db, "users", userId, "availableMenus");

    try {
      const existing = await getDocs(availableMenusRef);
      const deleteOps = existing.docs.map(docSnap => deleteDoc(docSnap.ref));
      await Promise.all(deleteOps);

      const batch = selectMenus.map(menu =>
        addDoc(
          availableMenusRef, {
          name: menu.name,
          category: menu.category,
          ingredients: menu.ingredients || [],
          isCustom: menu.isCustom || false
        })
      );
      await Promise.all(batch);

      const step3Ref = doc(db, "users", userId, "setup", "info");
      await setDoc(step3Ref, { step3setup: true }, { merge: true });

      onNext({ selectMenus });
    } catch (error) {
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

          <DishList title="肉料理" icon="/1.png" dishes={baseMenus.肉} selected={selectMenus} onToggle={handleToggle} days={mealDays} />
          <DishList title="魚料理" icon="/2.png" dishes={baseMenus.魚} selected={selectMenus} onToggle={handleToggle} days={fishDays} />
          <DishList title="その他料理" icon="/3.png" dishes={baseMenus.その他} selected={selectMenus} onToggle={handleToggle} days={otherDays} />

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
            <IngredientsInput
              ingredients={ingredients}
              setIngredients={setIngredients}
              customIngredient={customIngredient}
              setCustomIngredient={setCustomIngredient}
              handleRegisterMenu={handleRegisterMenu}
              allIngredients={allIngredients}
              setAllIngredients={setAllIngredients}
              filteredSuggestions={filteredSuggestions}
              setFilteredSuggestions={setFilteredSuggestions}
            />



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
    </div>
  );
};

export default CreatorStep3