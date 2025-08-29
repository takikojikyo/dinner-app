import { useState } from "react";



const This_Week_Menu = () => {
  const [isWeekMenuOpen, setIsWeekMenuOpen] = useState(false);
  const WeekMenuOpen = () => setIsWeekMenuOpen(prev => !prev);


  return (
    <div className="This_Week_Menu">
      <div className="section_title">
        <img src="/7.png" alt="カレンダーのアイコン" />
        <h3>今週の献立</h3>
      </div>

      <div className="This_Week_Menu_list">
        <button className={`${isWeekMenuOpen ? "open" : ""}`} onClick={WeekMenuOpen}>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>月</span>
                1
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>火</span>
                2
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>水</span>
                3
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>木</span>
                4
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>金</span>
                5
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>土</span>
                6
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>日</span>
                7
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
        <button>
          <div className="This_Week_Menu_titlebox">
            <div>
              <p className='This_Week_Menu_day'>
                <span className='This_Week_Menu_weekday'>月</span>
                1
              </p>
              <h4 className='This_Week_Menu_title'>カレーライス</h4>
            </div>
            <img src="/arrow3.png" alt="矢印" />
          </div>
          <div className="This_Week_Menu_hide">
            <h4>◆材料</h4>
            <p>米</p>
            <p>豚肉</p>
            <p>ジャガイモ</p>
            <p>人参</p>
            <p>玉ねぎ</p>
            <p>カレールー</p>
            <p>サラダ油</p>
          </div>
        </button>
      </div>
    </div>
  );
}


export default This_Week_Menu;