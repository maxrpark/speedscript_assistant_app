import { ref } from 'speedscript';
const year = ref('year');
const showYear = () => {
    const showYear = new Date().getFullYear().toString();
    year.ref.textContent = showYear;
};
export default showYear;
