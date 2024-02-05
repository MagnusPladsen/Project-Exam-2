function formatToDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString();
}

export default formatToDate;
