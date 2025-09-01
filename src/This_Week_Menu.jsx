import { useState } from "react";

import { week_menus } from "./menus";




const This_Week_Menu = () => {
  const [openIndex, setOpenIndex] = useState([]);
  const toggleMenu = (index) => {
    setOpenIndex((prev) =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };


  const This_week_menus = week_menus.map((menu, index) => {
    return (
      <button
        key={menu.date + menu.day}
        className={`${openIndex.includes(index) ? "open" : ""}`}
        onClick={() => toggleMenu(index)}
      >
        <div className="This_Week_Menu_titlebox">
          <div>
            <p className='This_Week_Menu_day'>
              <span className='This_Week_Menu_weekday'>{menu.day}</span>
              {menu.date}
            </p>
            <h4 className='This_Week_Menu_title'>{menu.title}</h4>
          </div>
          <img src="/arrow3.png" alt="矢印" />
        </div>

        <div className={`This_Week_Menu_hide ${openIndex.includes(index) ? "show" : ""}`}>
          <h4>◆材料</h4>
          {
            menu.ingredients.map((item, i) => (
              <p key={i}>{item}</p>
            ))
          }
        </div>


      </button>
    )
  });

  return (
    <>
      <div className="This_Week_Menu">
        <div className="section_title">
          <img src="/7.png" alt="カレンダーのアイコン" />
          <h3>今週の献立</h3>
        </div>

        <div className="This_Week_Menu_list">
          {This_week_menus}
        </div>

        <p className="This_Week_Menu_pagenation1">＜ 前の週</p>
      </div>

    </>
  );
}


export default This_Week_Menu;