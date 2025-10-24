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
// import IngredientAliases from './components/IngredientAliases';
// import IngredientAdd from './pages/IngredientAdd';
// import BaseMenuListTest from './pages/BaseMenuListTest';
// import BaseMenuList from './components/BaseMenuList';




function App() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  // const [loading, setloading] = useState(true);
  const [_isFirstTime, setIsFirstTime] = useState(true);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  

  if (!authReady) {
    return <div>Loading...</div>; // ローディング表示
  }

  

  return (

    <BrowserRouter>
      <Routes>
        {/* 初回アクセス分岐 */}
        {/* <Route
          path="/"
          element={
            <Navigate to="/host" replace />
          }
        /> */}

        {/* Creator-signup */}
        {/* <Route
          path="/Creator-signup"
          element={<CreatorSignUp />}
        /> */}

        {/* 初回アクセスはそのまま CreatorSignUp */}
        {/* <Route path="/" element={user ? <Navigate to="/host" replace /> : <Navigate to="/Creator-signup" replace />} /> */}
        <Route path="/" element={<Navigate to="/Creator-signup" replace />}  />
        <Route path="/Creator-signup" element={<CreatorSignUp setIsFirstTime={setIsFirstTime} />} />


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
        {/* <Route path="/ingredient-add" element={<IngredientAdd/>} /> */}

        {/* 材料エイリアス追加用 */}
        {/* <Route path="/Ingredient-Aliases" element={<IngredientAliases />} />   */}

        {/* Not Found */}

        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App













// function App() {
//   const [user, setUser] = useState(null);
//   const [loading, setloading] = useState(true);
//   const [isFirstTime, setIsFirstTime] = useState(true);




//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setloading(false);
//     });
//     return unsubscribe;
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // ローディング表示
//   }

//   return (

//     <BrowserRouter>
//       <Routes>
//         {/* 初回アクセス分岐 */}
//         <Route
//           path="/"
//           element={
//             isFirstTime ? (
//               <Navigate to="/Creator-signup" replace />
//             ) : (
//               <Navigate to="/host" replace />
//             )
//           }
//         />

//         {/* Creator-signup */}
//         <Route
//           path="/Creator-signup"
//           element={
//             isFirstTime ? (
//               <CreatorSignUp onNext={() => setIsFirstTime(false)} setIsFirstTime={setIsFirstTime} />
//             ) : (
//               <Navigate to="/host" replace />
//             )

//           }
//         />




// //         <Route path="/host/*" element={<LayoutHost user={user} />}>
// //           <Route index element={<HostHome />} />
// //           <Route path="shopping-list" element={<ShoppingList />} />
// //           <Route path="Opening" element={<Opening />} />
// //           {/* MenuEditページ群 */}
// //           <Route path="MenuEdit1" element={<MenuEdit1 />} />
// //           <Route path="MenuEdit2" element={<MenuEdit2 />} />
// //           <Route path="MenuEdit3" element={<MenuEdit3 />} />
// //         </Route>


// //         <Route path="/gest/*" element={<LayoutGest user={user} />}>
// //           <Route index element={<GestStep1 />} />
// //           <Route path="GestStep2" element={<GestStep2 />} />
// //           <Route path="GestStep3" element={<GestStep3 />} />
// //           <Route path="Gest_thanks" element={<Gest_thanks />} />
// //         </Route>

// //         {/* メニュー追加用 */}
// //         {/* <Route path="/base-menu" element={<BaseMenuList/>} /> */}

// //         {/* 材料追加用 */}
// //         {/* <Route path="/ingredient-add" element={<IngredientAdd/>} /> */}

// //         {/* 材料エイリアス追加用 */}
// //          {/* <Route path="/Ingredient-Aliases" element={<IngredientAliases />} />   */}

// //         {/* Not Found */}

// //         <Route path="*" element={<h1>Not Found Page</h1>} />
// //       </Routes>
// //     </BrowserRouter>

// //   )
// // }

// // export default App


