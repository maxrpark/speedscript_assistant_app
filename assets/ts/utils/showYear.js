import { ref } from '../../../node_modules/speedscript/lib/index.js';
const year = ref('year');
const showYear = () => {
    const showYear = new Date().getFullYear().toString();
    year.ref.textContent = showYear;
};
export default showYear;
