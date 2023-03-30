export const dateFormatter = (date) => {
  const d = new Date(date ?? Date.now());
  const month = monthStrings(d.getMonth());
  const day = d.getDate();
  const year = d.getFullYear();

  return [day, month, year].join(' ');
}

export const monthStrings = (month) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month];
}