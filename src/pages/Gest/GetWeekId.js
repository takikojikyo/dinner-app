export const getWeekId = (offset = 0) => {
  const now = new Date();
  now.setDate(now.getDate() + offset * 7);

  const firstThursday = new Date(now.getFullYear(), 0, 4);
  const dayDiff = (now - firstThursday) / 86400000;
  const weekNumber = Math.ceil((dayDiff + firstThursday.getDay() + 1) / 7);

  return `${now.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
};
