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
  }
}