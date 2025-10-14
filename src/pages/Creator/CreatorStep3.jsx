import { useEffect, useState } from 'react';
import './CreatorStep.css';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import * as wanakana from 'wanakana';


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

const IngredientsInput = ({ ingredients, setIngredients, customIngredient, setCustomIngredient, handleRegisterMenu, allIngredients, setAllIngredients, filteredSuggestions, setFilteredSuggestions }) => {

  // const [allIngredients, setAllIngredients] = useState([]);
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  useEffect(() => {
    const fetchIngredientMaster = async () => {
      const userId = auth.currentUser.uid;
      const snapshot = await getDocs(collection(db, "users", userId, "ingredientsMaster"));
      const data = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          name: d.name, aliases: d.aliases || []
        };
      });
      setAllIngredients(data);
    }
    fetchIngredientMaster();
  }, []);

    useEffect(() => {
      if (customIngredient.trim() === "") {
        setFilteredSuggestions([]);
        return;
      }
  
      const inputHira = wanakana.toHiragana(customIngredient.trim());
      const filtered = allIngredients.filter(item => {
        const nameHira = wanakana.toHiragana(item.name);
        const nameMatch=nameHira.startsWith(inputHira);
        const aliasesMatch = item.aliases.some(
          alias => wanakana.toHiragana(alias)===inputHira
        );
        return nameMatch || aliasesMatch;
      });
  
      setFilteredSuggestions(filtered);
    }, [customIngredient, allIngredients]);

  const handleAddIngredient = async (selected) => {
    if (!selected) return;
    const name = selected.name;

    if (!ingredients.includes(name)) {
      setIngredients(prev => [...prev, name])
    };

    // DBにない正規名なら追加
    const exists = allIngredients.some(i => i.name === name);
    if (!exists) {
      try {
        const userId = auth.currentUser.uid;
        const safeId = encodeURIComponent(name);
        await setDoc(doc(db, "users", userId, "ingredientsMaster", safeId), { name, aliases: [] });
        setAllIngredients(prev => [...prev, { name, aliases: [] }]);

        await setDoc(doc(db, "users", userId, "ingredients", safeId), { name });

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
          onClick={() => handleAddIngredient({ name: customIngredient, aliases: [] })}
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




const CreatorStep3 = ({ mealDays, fishDays, otherDays, onNext }) => {

  const [mealType, setMealType] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectMenus, setSelectMenus] = useState([]);
  const [baseMenus, setBaseMenus] = useState({ 肉: [], 魚: [], その他: [] })
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);






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

    const userId = auth.currentUser.uid;
    const availableMenusRef = collection(db, "users", userId, "availableMenus");

    try {
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