const getLocalDate = () => {
  const localDate = new Date();
  return {
    date: localDate
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .replace(/ /g, " "),

    time: localDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export default getLocalDate;
