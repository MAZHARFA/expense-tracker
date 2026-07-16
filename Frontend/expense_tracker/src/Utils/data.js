import moment from "moment";

export const addThounsandSeperater = (num) => {
  if (num === null || isNaN(num)) return "0";

  const [integerPart, fractionalPart] = num.toString().split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const formatCurrency = (amount = 0) => {
  // Converts to: "49,999.55"
  const formatted = Number(amount).toLocaleString("en-PK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `PKR ${formatted}`; // Final output: "PKR 49,999.55"
};



export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category || "Unknown",
    amount: item?.amount || 0,
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = [], filter = "all") => {
  const now = moment();

  // 1. Filter based on the selected option
  const filteredData = data.filter((item) => {
    const itemDate = moment(item.date);

    if (filter === "month") {
      return itemDate.isSame(now, "month");
    }

    if (filter === "year") {
      return itemDate.isSame(now, "year");
    }

    return true; // default: all
  });

  // 2. Sort by date (oldest to newest)
  const sortedData = [...filteredData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 3. Format data for the chart
  const chartData = sortedData.map((item) => ({
    category: moment(item?.date).format("D MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};
export const prepareExpenseLineChartData = (data = [], filter = "all") => {
  const now = moment();

  const filteredData = data.filter((item) => {
    const itemDate = moment(item.date);

    if (filter === "month") return itemDate.isSame(now, "month");
    if (filter === "year") return itemDate.isSame(now, "year");
    return true;
  });

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("D MMM"), // <-- this matches <XAxis dataKey="month" />
    amount: Number(item?.amount),
  }));

  return chartData;
};
