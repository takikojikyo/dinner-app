import { useNavigate } from "react-router-dom";
import { auth, db } from '../firebase';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


const Header_Gest = () => {
  const navigate = useNavigate();
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === "host") {
          setIsHost(true);
        }
      }

    });
    return () => unsubscribe();
  }, []);



  return (
    <>
      <header>
        <div className="HeaderTop HeaderTop_Gest">
          <div className="container">
            <button className="header_app_title">
              <img src="/app.png" alt="アプリのアイコン" />
              <h1>だれか決めて！晩ごはん</h1>
            </button>
            <div className="header_mode">
              <img src="/m2.png" alt="ナイフフォーク" />
              <h2>食べる人モード</h2>
            </div>
          </div>
        </div>
        <div className="HeaderBottom HeaderBottom_Gest">
          <div className="container">
            <button
            className="gest_menu_button"
            >今週の献立
            </button>

            {isHost && (
              <button
                className="Toggle_mode Toggle_mode_Gest"
                onClick={() => {
                  navigate("/host");
                }}>
                <img className="Toggle_mode_img" src="/m1.png" alt="" />
                <p>作る人モード切替</p>
                <img className="arrow" src="/arrow2.png" alt="" />
              </button>
            )}



          </div>


        </div>
      </header>




    </>
  )
}

export default Header_Gest