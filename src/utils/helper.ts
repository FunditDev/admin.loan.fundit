export const timeFormatter = (date: Date) => {
    const loanCreatedDate = new Date(date);
    const formattedDate = loanCreatedDate.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  
    return formattedDate;
  };

  export const formatAmount = (amount: string) => {
    if (typeof amount === "number") return amount;
    else {
      return parseFloat(amount?.replace(/,/g, "")).toFixed(2);
    }
  };