export const invoiceDueDate = (creationDate: Date) => {
  const dueDate = new Date(creationDate);
  dueDate.setDate(dueDate.getDate() + 45);

  return dueDate;
};
