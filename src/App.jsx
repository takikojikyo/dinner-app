import './App.css';
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";

import HostHome from './pages/Host/HostHome';
import ShoppingList from './pages/Host/ShoppingList';
import LayoutHost from './components/LayoutHost';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import LayoutGest from './components/LayoutGest';
import GestStep1 from './pages/Gest/GestStep1';
import GestStep2 from './pages/Gest/GestStep2';
import GestStep3 from './pages/Gest/GestStep3';
import Gest_thanks from './pages/Gest/Gest_thanks';
import Opening from './pages/Creator/Opening';
import MenuEdit1 from './pages/MenuEdit/MenuEdit1';
import MenuEdit2 from './pages/MenuEdit/MenuEdit2';
import MenuEdit3 from './pages/MenuEdit/MenuEdit3';
import CreatorSignUp from './pages/Creator/CreatorSignUp';
import IngredientAdd from './pages/IngredientAdd';
// import BaseMenuListTest from './pages/BaseMenuListTest';
// import BaseMenuList from './components/BaseMenuList';




function App() {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true); // 初回フラグ




  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>; // ローディング表示
  }

  return (

    <BrowserRouter>
      <Routes>
        {/* 初回アクセス分岐 */}
        <Route
          path="/"
          element={
            isFirstTime ? (
              <Navigate to="/Creator-signup" replace />
            ) : (
              <Navigate to="/host" replace />
            )
          }
        />

        {/* Creator-signup */}
        <Route
          path="/Creator-signup"
          element={
            isFirstTime ? (
              <CreatorSignUp onNext={() => setIsFirstTime(false)} />
            ) : (
              <Navigate to="/host" replace />
            )

          }
        />




        <Route path="/host/*" element={<LayoutHost user={user} />}>
          <Route index element={<HostHome />} />
          <Route path="shopping-list" element={<ShoppingList />} />
          <Route path="Opening" element={<Opening />} />
          {/* MenuEditページ群 */}
          <Route path="MenuEdit1" element={<MenuEdit1 />} />
          <Route path="MenuEdit2" element={<MenuEdit2 />} />
          <Route path="MenuEdit3" element={<MenuEdit3 />} />
        </Route>


        <Route path="/gest/*" element={<LayoutGest user={user} />}>
          <Route index element={<GestStep1 />} />
          <Route path="GestStep2" element={<GestStep2 />} />
          <Route path="GestStep3" element={<GestStep3 />} />
          <Route path="Gest_thanks" element={<Gest_thanks />} />
        </Route>

        {/* メニュー追加用 */}
        {/* <Route path="/base-menu" element={<BaseMenuList/>} /> */}

        {/* 材料追加用 */}
        <Route path="/ingredient-add" element={<IngredientAdd/>} />

        {/* Not Found */}

        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App




// import './App.css';
// import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

// import HostHome from './pages/Host/HostHome';
// import ShoppingList from './pages/Host/ShoppingList';
// import LayoutHost from './components/LayoutHost';
// import CreatorStep1 from './pages/Creator/CreatorStep1';
// import CreatorStep2 from './pages/Creator/CreatorStep2';
// import CreatorStep3 from './pages/Creator/CreatorStep3';
// import CreatorStep4 from './pages/Creator/CreatorStep4';
// import CreatorStep5 from './pages/Creator/CreatorStep5';




// function App() {

//   return (




//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LayoutHost />}>
//           <Route index element={<HostHome />} />
//           <Route path="shopping-list" element={<ShoppingList />} />
//         </Route>

//         {/* 作る人の4ステップ設定 */}
//         <Route path="/creator/step1" element={<CreatorStep1 />} />
//         <Route path="/creator/step2" element={<CreatorStep2 />} />
//         <Route path="/creator/step3" element={<CreatorStep3 />} />
//         <Route path="/creator/step4" element={<CreatorStep4 />} />
//         <Route path="/creator/step5" element={<CreatorStep5 />} />

//         {/* 招待を受けた人用Home */}
//         {/* <Route path="/home/guest" element={<GuestHome />} /> */}

//         {/* 食べる人の投票ステップ */}
//         {/* <Route path="/vote/step1" element={<VoteStep1 />} />
//           <Route path="/vote/step2" element={<VoteStep2 />} />
//           <Route path="/vote/step3" element={<VoteStep3 />} />
//           <Route path="/vote/thanks" element={<VoteThanks />} /> */}

//         {/* Not Found */}
//         <Route path="*" element={<h1>Not Found Page</h1>} />
//       </Routes>
//     </BrowserRouter>

//   )
// }

// export default App
