function formatHour(date: Date) {
  const hour = date.getHours();
  return (hour < 10 ? '0' : '') + hour + 'h';
}

export default formatHour;
