function formatNumber(num: number) {
  return (num < 10 ? '0' : '') + num;
}

export function formatHour(date: Date) {
  const hour = date.getHours();
  return formatNumber(hour) + 'h';
}

export function formatHourAndMinutes(date: Date) {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${formatNumber(hour)}:${formatNumber(minutes)}`;
}
