module.exports = {
  validateDateSpan: ({ from, to }) => {
    // TODO
    // From must be less recent than to
    // From and to passed in as YYYY-MM-DD
    // Will return true if span is valid, false o/w
  },
  isDate: (input) => {
    // Check if date is of type date
    const date = new Date(input);
    const isDate = date.getTime() !== NaN;
    return isDate;
  },
  isWeekend: (input) => {
    const date = new Date(input);
    const day = date.getDay();
    return (day === 6 || day === 0);
  },
  getDatesBetween: (from, to, noWeekends) => {
    // const thirtyDayMonths = [4,6,9,11];
    const isWeekend = (date) => this.isWeekend(date);
    // const isLeapYear = (date) => (date.getFullYear()) % 4 !== 0;

    let currentDate = new Date(from);
    let finalDate = new Date(to);
    const allDates = [];
    do {
      if (this.isDate(currentDate)) {
        // Check if date is on a weekend
        if (noWeekends && this.isWeekend(currentDate)) {
          // pass
        } else {
          allDates.push(currentDate);
          currentDate = new Date(parseInt(currentDate.getTime()) + 86400000); // Go to the next day
        }
      } else {
        // pass
      }
    }
    while (currentDate !== finalDate)

    return allDates;
  }
}