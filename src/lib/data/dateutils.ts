//write a function to convert date time string to JS date object
export function dateStringToJSDate(date: string): Date {
  let dateArray = date.split("-");
  let ret = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
  console.log(date, ret);
  return ret;
}

export function datetimeStringToJSDate(date: string, time: string): Date {
  let dateArray = date.split("-");
  let timeArray = time.split(":");
  let ret = new Date(
    +dateArray[0],
    +dateArray[1] - 1,
    +dateArray[2],
    +timeArray[0],
    +timeArray[1]
  );
  console.log(date, time, ret);
  return ret;
}

export function remainingDays(date: Date): number {
  let diff = date.getTime() - new Date().getTime();
  let days = Math.floor(diff / (1000 * 60 * 60 * 24));
  return days;
}

// return something like 11:59 PM
export function getTimeString(date: Date): string {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let h: string;
  let m: string;
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  h = hours ? hours.toString() : "12"; // the hour '0' should be '12'
  m = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
  let strTime = h + ":" + m + " " + ampm;
  return strTime;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getDateTimeString(date: Date): string {
  let day = date.getDate();
  let suff = "";
  if (day >= 10 && day < 20) suff = "th";
  else if (day % 10 == 1) {
    suff = "st";
  } else if (day % 10 == 2) {
    suff = "nd";
  } else if (day % 10 == 3) {
    suff = "rd";
  } else {
    suff = "th";
  }
  return (
    `${date.getDate()}` +
    suff +
    " " +
    `${months[date.getMonth()]}` +
    " " +
    `${date.getFullYear()}` +
    ", " +
    getTimeString(date)
  );
}
