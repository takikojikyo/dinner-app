import { useEffect, useState } from "react";
import { addBaseMenu, fetchBaseMenus } from "../api/baseMenus";



export default function BaseMenuListTest() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchBaseMenus();
      setMenus(data);
    };
    load();
  }, []);

  const handleAdd=async()=>{
    await addBaseMenu({name:"テストメニュー",category:"肉料理"});
    const data=await fetchBaseMenus();
    setMenus(data);
  };

  return (
    <div>
      <h2>献立一覧</h2>

      {menus.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <ul>
          {
            menus.map((menu) => (
              <li key={menu.id}>{menu.name} (カテゴリ：{menu.category})</li>
            ))
          }
        </ul>
      )}
      <button onClick={handleAdd}>テストデータ追加</button>
    </div>
  )

};



