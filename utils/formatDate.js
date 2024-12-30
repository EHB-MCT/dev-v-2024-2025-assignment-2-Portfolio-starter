const { format } = require('date-fns');
const { nl } = require('date-fns/locale');

function getFormattedDate(currentDate) {
    const formattedToday = format(currentDate, 'dd'); // Day of the month
    const currentDayOfWeek = format(currentDate, 'iii', { locale: nl }); // Abbreviated weekday
    const shortDayOfWeek = currentDayOfWeek.length > 2 ? currentDayOfWeek.slice(0, 2) : currentDayOfWeek; // Truncate if needed

    return { formattedToday, shortDayOfWeek };
}

module.exports = { getFormattedDate };
