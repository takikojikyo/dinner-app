
import { collection, doc, getDocs, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase';
import * as wanakana from 'wanakana';
import { onAuthStateChanged } from 'firebase/auth';


const IngredientsInputMenuEdit3 = ({
  ingredient,
  setIngredient,
  customIngredient,
  setCustomIngredient,
  ingredientAddClick,
  allIngredients,
  setAllIngredients,
  filteredSuggestions,
  setFilteredSuggestions }) => {

  // const [allIngredients, setAllIngredients] = useState([]);
  // const [filteredSuggestions, setFilteredSuggestions] = useState([]);



  useEffect(() => {
    const fetchIngredientMaster = async (userId) => {
      const snapshot = await getDocs(collection(db, "users", userId, "ingredientsMaster"));
      const data = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          name: d.name, aliases: d.aliases || []
        };
      });
      setAllIngredients(data);
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
    const handler = setTimeout(() => {
      if (customIngredient.trim() === "") {
        setFilteredSuggestions([]);
        return;
      }

      const inputHira = wanakana.toHiragana(customIngredient.trim());
      const filtered = allIngredients.filter(item => {
        const nameHira = wanakana.toHiragana(item.name);
        const nameMatch = nameHira.startsWith(inputHira);
        const aliasesMatch = item.aliases.some(
          alias => wanakana.toHiragana(alias).startsWith(inputHira)
        );
        return nameMatch || aliasesMatch;
      });

      setFilteredSuggestions(filtered);
    }, 300);
    return () => clearTimeout(handler);
  }, [customIngredient, allIngredients]);

  const handleAddIngredient = async (selected) => {
    if (!selected) return;
    const name = selected.name;

    if (!ingredient.includes(name)) {
      setIngredient(prev => [...prev, name])
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



    <div className="MenuEdit3_addbox">
      <div className="MenuEdit3_addbox_2">
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
                filteredSuggestions.map((item) => (
                  <li
                    key={item.name}
                    className='suggestion-item'
                    role='option'
                    onClick={() => handleAddIngredient(item)}
                  >
                    {item.name}
                  </li>
                ))}
            </ul>
          )}
      </div>

      <button onClick={ingredientAddClick}>追加</button>
    </div>



  );

};

const MenuEdit3 = () => {

  const { selectedMenu } = useOutletContext();
  const [ingredient, setIngredient] = useState(selectedMenu?.ingredients || []);
  // const [input, setInput] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();


  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, () => { });
  //   return () => unsubscribe();
  // }, []);
  const ingredientDeleteClick = (index) => {
    const newingredients = ingredient.filter((_, i) => {
      return i !== index;
    })
    setIngredient(newingredients);
  }

  const ingredientAddClick = async () => {
    const trimmed = customIngredient.trim();
    if (!trimmed) {
      alert('材料入力してください')
      return;
    };


    if (ingredient.includes(trimmed)) {
      setCustomIngredient("");
      return;
    }
    setIngredient(prev => [...prev, trimmed]);
    const exists = allIngredients.some(i => i.name === trimmed);
    if (!exists) {
      try {
        const userId = auth.currentUser.uid;
        const safeId = encodeURIComponent(trimmed);
        const batch = writeBatch(db);
        const masterRef = doc(db, "users", userId, "ingredientsMaster", safeId);
        const ingRef = doc(db, "users", userId, "ingredients", safeId);

        batch.set(masterRef, { name: trimmed, aliases: [] });
        batch.set(ingRef, { name: trimmed });
        await batch.commit();
        // await setDoc(doc(db, "users", userId, "ingredientsMaster", safeId), { name: trimmed, aliases: [] });
        // await setDoc(doc(db, "users", userId, "ingredients", safeId), { name: trimmed });
        setAllIngredients(prev => [...prev, { name: trimmed, aliases: [] }]);

      } catch (error) {
        console.error("材料追加失敗:", error);
        alert("材料の追加に失敗しました");
      }
    }


    setFilteredSuggestions([]);
    setCustomIngredient("");

  }



  const handleSave = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert("ユーザーが確認できません");
        return;
      }

      const menuRef = doc(db, "users", userId, "availableMenus", selectedMenu.id);
      await updateDoc(menuRef, {
        ingredients: ingredient,
      });
      alert("変更を保存しました");
      navigate("/");
    } catch (error) {
      console.error("保存中にエラーが発生しました：", error);
      alert("保存に失敗しました");
    }
  };


  if (!selectedMenu) {
    return <p>メニューが選択されていません</p>
  }

  return (

    <div className="MenuEdit2">
      <div className="container">
        <div className="Step_inner">

          <h3>料理の材料を編集</h3>

          <h4><span>『 {selectedMenu.name} 』</span>の材料を編集</h4>
          <ul>
            {
              ingredient.map((i, index) => (
                <li key={`edit-${i}`}>
                  <p>{i}</p>
                  <button
                    onClick={() => ingredientDeleteClick(index)}
                  >
                    <img src="/8.png" alt="" />
                  </button>
                </li>
              ))
            }
          </ul>

          <IngredientsInputMenuEdit3
            ingredient={ingredient}
            setIngredient={setIngredient}
            customIngredient={customIngredient}
            setCustomIngredient={setCustomIngredient}
            ingredientAddClick={ingredientAddClick}
            allIngredients={allIngredients}
            setAllIngredients={setAllIngredients}
            filteredSuggestions={filteredSuggestions}
            setFilteredSuggestions={setFilteredSuggestions}
          />
          {/* <div className="MenuEdit3_addbox">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="材料を入力"
            />
            <button onClick={ingredientAddClick}>追加</button>
          </div> */}

          <button className='appbutton appbutton1' onClick={handleSave}>この変更を保存</button>


          <Link className='Geststep2button2 menuEdit3_nav' to="/host/MenuEdit2">＜ 料理選択へ戻る</Link>



        </div>

      </div>
    </div>
  );
}

export default MenuEdit3;