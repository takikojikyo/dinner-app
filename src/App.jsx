import './App.css';
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import HostHome from './pages/Host/HostHome';
import ShoppingList from './pages/Host/ShoppingList';
import LayoutHost from './components/LayoutHost';
import CreatorStep1 from './pages/Creator/CreatorStep1';
import CreatorStep2 from './pages/Creator/CreatorStep2';
import CreatorStep3 from './pages/Creator/CreatorStep3';
import CreatorStep4 from './pages/Creator/CreatorStep4';
import CreatorStep5 from './pages/Creator/CreatorStep5';
import { useState } from 'react';
import LayoutGest from './components/LayoutGest';
import GestStep1 from './pages/Gest/GestStep1';
import GestStep2 from './pages/Gest/GestStep2';




function App() {
  const [isFirstTime, setIsFirstTime] = useState(true); // 初回フラグ
  const [isHost, setIsHost] = useState(false);           // ホストかどうか

  return (

    <BrowserRouter>
      <Routes>

        {isFirstTime && (
          <>
            {/* 作る人の4ステップ設定 */}
            <Route path="/creator/step1" element={<CreatorStep1 />} />
            <Route path="/creator/step2" element={<CreatorStep2 />} />
            <Route path="/creator/step3" element={<CreatorStep3 />} />
            <Route path="/creator/step4" element={<CreatorStep4 />} />
            <Route path="/creator/step5" element={<CreatorStep5 />} />

          </>
        )}

        {isHost ? (
          <Route path="/" element={<LayoutHost setIsHost={setIsHost}/>}>
            <Route index element={<HostHome />} />
            <Route path="shopping-list" element={<ShoppingList />} />
          </Route>
        ) : (
          <Route path="/" element={<LayoutGest setIsHost={setIsHost}  />}>
            <Route index element={<GestStep1 />} />
            <Route path="GestStep2" element={<GestStep2 />} />
          </Route>
        )}



        {/* 招待を受けた人用Home */}
        {/* <Route path="/home/guest" element={<GuestHome />} /> */}

        {/* 食べる人の投票ステップ */}
        {/* <Route path="/vote/step1" element={<VoteStep1 />} />
          <Route path="/vote/step2" element={<VoteStep2 />} />
          <Route path="/vote/step3" element={<VoteStep3 />} />
          <Route path="/vote/thanks" element={<VoteThanks />} /> */}

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
