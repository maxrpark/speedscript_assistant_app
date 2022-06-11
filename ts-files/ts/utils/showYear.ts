let { ref } = require('speedscript');
const year = ref('year');
const showYear = () => {
  const showYear: string = new Date().getFullYear().toString();
  year.ref.textContent = showYear;
};
export default showYear;
