export function timeAgo(input: string | Date | number): string {
  const date = input instanceof Date ? input : new Date(input);
  if (isNaN(date.getTime())) return "invalid date";

  const diffMs = Date.now() - date.getTime();
  const future = diffMs < 0;
  const abs = Math.abs(diffMs);

  const sec = Math.floor(abs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const week = Math.floor(day / 7);
  const month = Math.floor(day / 30);  // rough
  const year = Math.floor(day / 365);  // rough

  const pick = () => {
    if (sec < 60) return `${sec} second${sec === 1 ? "" : "s"}`;
    if (min < 60) return `${min} minute${min === 1 ? "" : "s"}`;
    if (hr < 24) return `${hr} hour${hr === 1 ? "" : "s"}`;
    if (day < 7) return `${day} day${day === 1 ? "" : "s"}`;
    if (week < 5) return `${week} week${week === 1 ? "" : "s"}`;
    if (month < 12) return `${month} month${month === 1 ? "" : "s"}`;
    return `${year} year${year === 1 ? "" : "s"}`;
  };

  return future ? `in ${pick()}` : `${pick()} ago`;
}