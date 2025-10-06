// import { useState } from "react";
// import { db } from "../firebase";
// import { addDoc, collection } from "firebase/firestore";

// export default function IngredientAdd() {
//   const [ingredient, setIngredient] = useState("");

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     const name = ingredient.trim();
//     if (!name) return;
//     try {
//       await addDoc(collection(db, "ingredients"), { name });
//       setIngredient("");
//     } catch (error) {
//       console.error("材料の追加に失敗しました:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>材料追加</h2>
//       <form onSubmit={handleAdd}>
//         <input
//           type="text"
//           value={ingredient}
//           onChange={e => setIngredient(e.target.value)}
//           placeholder="材料を追加"
//           style={{
//             padding: "8px",
//             fontSize: "16px",
//             borderRadius: "4px",
//             border: "1px solid #ccc",
//             width: "200px"
//           }}
//         />
//         <button 
//         type="submit"
//         style={{
//           padding:"8px",
//           marginLeft:"8px",
//             border: "1px solid #255,255,255,255",
//             background:"#ccc",
//             width: "100px"
//           }}
//         >追加
//         </button>
//       </form>
//     </div>
//   )
// }