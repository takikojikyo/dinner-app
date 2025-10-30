import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getWeekId } from "../Gest/GetWeekId";
import { v4 as uuidv4 } from "uuid";


export const generateWeeklyMenu = async (hostId, userId) => {

  const weekId = getWeekId(0);
  const weekRef = doc(db, "weeklyPlans", hostId, "week", weekId);

  const votesSnap = await getDocs(collection(weekRef, "votes"));
  const votes = votesSnap.docs.map((d) => d.data());

  if (votes.length === 0) {
    console.warn("投票データがありません");
  }

  const setupSnap = await getDoc(doc(db, "users", userId, "setup", "info"));
  const setup = setupSnap.data() || {};
  const { mealDays = 4, fishDays = 2, otherDays = 2 } = setup;

  const menuSnap = await getDocs(collection(db, "users", userId, "availableMenus"))
  const allMenus = menuSnap.docs.map((d) => d.data());

  const meatMenus = allMenus.filter(m => m.category === "肉");
  const fishMenus = allMenus.filter(m => m.category === "魚");
  const otherMenus = allMenus.filter(m => m.category !== "肉" && m.category !== "魚");

  // const pickRandom = (list) => list[Math.floor(Math.random() * list.length)] || null;

  const days = ["月", "火", "水", "木", "金", "土", "日"];

  const groupedVotes = {};
  for (const v of votes) {
    if (!groupedVotes[v.day]) groupedVotes[v.day] = [];
    groupedVotes[v.day].push(v);
  }
  const adopted = {};
  const overflow = [];

  const usedTitles = new Set();

  for (const [day, list] of Object.entries(groupedVotes)) {
    if (list.length === 1) {
      adopted[day] = { ...list[0], source: "vote", id: uuidv4() };
    } else {
      const chosen = list[0];
      adopted[day] = { ...chosen, source: "vote", id: uuidv4() };
      overflow.push(...list.slice(1));
    }
    if (adopted[day]?.title) {
      usedTitles.add(adopted[day].title); // ✅ ここでタイトル登録
    }
  }


  // --- 重複しないランダム取得関数 ---
  const pickUniqueRandom = (list) => {
    const candidates = list.filter((m) => m && !usedTitles.has(m.title));
    const finalList = candidates.length > 0 ? candidates : list; // 候補が尽きたら再利用
    if (finalList.length === 0) return null;
    const picked = finalList[Math.floor(Math.random() * finalList.length)];
    usedTitles.add(picked.title); // ✅ 選んだらタイトル登録
    return picked;
  };

  const voteMeat = Object.values(adopted).filter((m) => m.category === "肉").length;
  const voteFish = Object.values(adopted).filter((m) => m.category === "魚").length;
  const voteOther = Object.values(adopted).filter((m) => !["肉", "魚"].includes(m.category)).length;

  const needMeat = Math.max(0, mealDays - voteMeat);
  const needFish = Math.max(0, fishDays - voteFish);
  const needOther = Math.max(0, otherDays - voteOther);

  const randomMenus = [
    ...Array(needMeat).fill().map(() => ({
      ...pickUniqueRandom(meatMenus),
      id: uuidv4(),
      source: "auto",
    })),
    ...Array(needFish).fill().map(() => ({
      ...pickUniqueRandom(fishMenus),
      id: uuidv4(),
      source: "auto",
    })),
    ...Array(needOther).fill().map(() => ({
      ...pickUniqueRandom(otherMenus),
      id: uuidv4(),
      source: "auto",
    })),
  ];

  const filledDays = Object.keys(adopted);
  const emptyDays = days.filter((d) => !filledDays.includes(d));

  let idx = 0;
  for (const menu of overflow) {
    if (idx < emptyDays.length) {
      adopted[emptyDays[idx]] = { ...menu, id: uuidv4(), source: "overflow" };
      idx++;
    }
  }

  let randomIdx = 0;

  for (const day of days) {
    if (!adopted[day] && randomIdx < randomMenus.length) {
      const menu = randomMenus[randomIdx];
      adopted[day] = {
        ...menu,
        day,
        ingredients: menu.ingredients || [],
      };
      usedTitles.add(menu.title);
      randomIdx++;
    }
  }

  const menusRef = collection(weekRef, "menus");

  for (const day of days) {
    const menu = adopted[day];
    if (menu) {
      await setDoc(doc(menusRef, day), {
        ...menu,
        ingredients: menu.ingredients || [],
      });
    }
  }


  console.log("献立自動生成完了:", adopted);
  return adopted;


}
