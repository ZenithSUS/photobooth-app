export const formatDate = (date: string) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-US", { dateStyle: "full" });
};

export default formatDate;
