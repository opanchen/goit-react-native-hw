export const getFormattedDate = (ms) => {
  //   const monthArr = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  const monthArrUA = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];

  const date = new Date(ms);

  const day = date.getDate();
  // const month = monthArr[date.getMonth()];
  const monthUA = monthArrUA[date.getMonth()];
  const year = date.getFullYear();

  const time = date.toTimeString().slice(0, 5);

  // const fullDate = `the ${day} of ${month}, ${year} | ${time}`;
  const fullDateUA = `${addLeadingZero(day)} ${monthUA}, ${year} | ${time}`;

  // return fullDate;
  return fullDateUA;
};

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
