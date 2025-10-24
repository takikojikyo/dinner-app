/**
 * 現在の週番号（ISO 8601準拠）を取得
 * offset: 0 = 今週, 1 = 来週, -1 = 先週 など
 */
export const getWeekId = (offset = 0) => {
  const now = new Date();
  // offset で週をずらす
  now.setDate(now.getDate() + offset * 7);

  // ISO 8601では、週は木曜日を基準に計算する
  const target = new Date(now.valueOf());
  const day = target.getDay();
  // 日曜日(0)は7に置き換え
  const isoDay = day === 0 ? 7 : day;
  // 木曜日を基準に週番号を計算
  target.setDate(target.getDate() + 4 - isoDay);

  const yearStart = new Date(target.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((target - yearStart) / 86400000) + 1) / 7);

  return `${target.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
};
