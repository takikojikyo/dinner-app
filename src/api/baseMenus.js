import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";


export const fetchBaseMenus = async () => {
  const snapshot = await getDocs(collection(db, "baseMenus"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export async function addBaseMenu(menu) {
  try {
    const docRef = await addDoc(collection(db, "baseMenus"), menu);
    console.log("Document written with ID:", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document:", e)
  }
}