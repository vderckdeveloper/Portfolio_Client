import moment from 'moment';
import 'moment-timezone';

/***
 * Truncate a string and append '...' if it exceeds a specified length.
 * 
 * @param {string} str - The string to be truncated.
 * @param {number} maxLength - The maximum length of the returned string excluding '...'.
 * @returns {string} - The truncated string.
 */
function truncateString(str: string, maxLength: number) {
    if (str.length >= maxLength) {
        return str.substring(0, maxLength) + '...';
    }

    // Subtract 3 for '...' to fit the entire string within maxLength
    return str;
}

/***
 * Convert utc time into korean time 
 * @param {Date} utcTime - utc time 
 * @return returns the korean time  
 */
function convertUtcToKoreanTime(utcTime: Date) {
    const koreanTime = moment.utc(utcTime).tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");
    return koreanTime;
}




export { 
    truncateString,
    convertUtcToKoreanTime,
}