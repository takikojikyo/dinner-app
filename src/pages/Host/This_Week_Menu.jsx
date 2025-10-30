import { useCallback, useEffect, useState } from "react";

// import { week_menus } from '../../menus';
import { generateWeeklyMenu } from "./generateWeeklyMenu";
import { auth, db } from "../../firebase";
import { getWeekId } from "../Gest/GetWeekId";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";



const This_Week_Menu = () => {
  const [openIndex, setOpenIndex] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", ingredients: [] });
  const [newIngredient, setNewIngredient] = useState("");
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);


  // const { hostId } = useParams();
  const { hostId: paramHostId } = useParams();
  const hostId = paramHostId || "TEST_HOST_ID";


  // Firestore から今週の献立を取得
  const fetchMenus = useCallback(async () => {
    try {
      const weekId = getWeekId(0);
      const menusRef = collection(db, "weeklyPlans", hostId, "week", weekId, "menus");
      const snap = await getDocs(menusRef);

      if (snap.empty) {
        setMenus([]);
      } else {
        const data = snap.docs.map((d) => d.data());
        const order = ["月", "火", "水", "木", "金", "土", "日"];
        data.sort((a, b) => order.indexOf(a.day) - order.indexOf(b.day));
        setMenus(data);
      }
    } catch (err) {
      console.error("献立データ取得エラー:", err);
    } finally {
      setLoading(false);
    }
  }, [hostId]);

  useEffect(() => {
    fetchMenus();
  }, [fetchMenus]);

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        console.error("未ログインユーザーです");
        return;
      }
      await generateWeeklyMenu(hostId, user.uid);
      await fetchMenus(); // 生成後に再取得
    } catch (err) {
      console.error("献立生成中にエラー:", err);
    } finally {
      setLoading(false);
    }
  };




  const toggleMenu = (index) => {
    setOpenIndex((prev) =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };
  const handleEdit = (menu) => {
    setEditingId(menu.id);
    setEditData({
      name: menu.title,
      ingredients: (menu.ingredients || []).map((ing) => ({
        id: Date.now() + Math.random(),
        name: ing.name || ing,
      })),
    })
  }

  const handleChangeName = (e) => {
    setEditData({ ...editData, name: e.target.value })
  };



  const handleAddIngredient = () => {
    if (!newIngredient.trim()) return;
    setEditData({
      ...editData,
      ingredients: [
        ...editData.ingredients,
        { id: Date.now(), name: newIngredient }],
    });
    setNewIngredient("");
  };

  const handleSave = async (id) => {
    try {
      const updated = {
        ...editData,
        ingredients: editData.ingredients.map((i) => i.name),
        id,
      };

      const weekId = getWeekId(0);
      const menuRef = collection(db, "weeklyPlans", hostId, "week", weekId, "menus");

      await setDoc(doc(menuRef, id), updated);
      setMenus((prev) => prev.map((m) => (m.id === id ? updated : m)));
    } catch (err) {
      console.error("保存エラー:", err);
    } finally {
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };


  if (loading) {
    return <p>献立を読み込み中...</p>
  }



  return (
    <div className="This_Week_Menu">
      <div className="section_title">
        <img src="/7.png" alt="カレンダーのアイコン" />
        <h3>今週の献立</h3>
      </div>

      {!menus.length && (
        <>
          <p>今週の献立データがありません</p>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="This_Week_Menu__create_button"
          >
            {regenerating ? "作成中..." : "今週の献立を作成"}
          </button>
        </>
      )}

      {menus.length > 0 && (
        <div className="This_Week_Menu_list">
          {menus.map((menu, index) => (

            <div
              key={menu.date + menu.day}
              className={`${openIndex.includes(index) ? "open" : ""}`}
              onClick={() => toggleMenu(index)}
              role="button"
            >
              <div className="This_Week_Menu_titlebox">
                <div>
                  <p className='This_Week_Menu_day'>
                    <span className='This_Week_Menu_weekday'>{menu.day}</span>
                    {menu.date}
                  </p>
                  <h4 className='This_Week_Menu_title'>{menu.name}</h4>
                </div>
                <img src="/arrow3.png" alt="矢印" />
              </div>

              <div
                className={`This_Week_Menu_hide ${openIndex.includes(index) ? "show" : ""
                  }`}>
                <h4>◆材料</h4>

                {editingId === menu.id ? (
                  <div className="This_Week_Menu__edit-area">
                    <label>
                      料理名：
                      <input
                        type="text"
                        value={editData.name}
                        onChange={handleChangeName}
                        onClick={(e) => e.stopPropagation()}
                        className="edit_input"
                      />
                    </label>
                    <div className="This_Week_Menu__edit_area2">

                      {editData.ingredients.map((item) => (
                        <div key={item.id} className="This_Week_menu__added-list">
                          <p>・{item.name}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditData({
                                ...editData,
                                ingredients: editData.ingredients.filter(
                                  (ing) => ing.id !== item.id
                                ),
                              });
                            }}
                          >
                            <img src="/delete.png" alt="×" />
                          </button>
                        </div>
                      ))}


                      <label>
                        材料名：
                        <input
                          type="text"
                          value={newIngredient}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            setNewIngredient(e.target.value)
                          } />
                      </label>


                      <button
                        onClick={
                          (e) => {
                            e.stopPropagation();
                            handleAddIngredient();
                          }}
                        className="This_Week_Menu__button This_Week_Menu__add-btn">
                        材料を追加
                      </button>
                    </div>

                    <div className="This_Week_Menu__edit_area3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(menu.id);
                        }}
                        className="This_Week_Menu__button This_Week_Menu__save-btn">
                        編集の保存
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancel();
                        }}
                        className="This_Week_Menu__button This_Week_Menu__cancel-btn">
                        編集キャンセル
                      </button>
                    </div>

                  </div>
                ) : (
                  <>
                    {(menu.ingredients||[]).map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(menu);
                      }}
                      className="This_Week_Menu__button This_Week_Menu__edit-btn">
                      編集
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}











    </div>
  )
}




export default This_Week_Menu;