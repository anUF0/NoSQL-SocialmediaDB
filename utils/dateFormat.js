//This code can be found at https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript/47437070#47437070
const DateFormatter = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  formatDate: function (date, format) {
    let self = this;
    format = self.getProperDigits(format, /d+/gi, date.getDate());
    format = self.getProperDigits(format, /M+/g, date.getMonth() + 1);
    format = format.replace(/y+/gi, function (y) {
      const len = y.length;
      const year = date.getFullYear();
      if (len == 2) return (year + '').slice(-2);
      else if (len == 4) return year;
      return y;
    });
    format = self.getProperDigits(format, /H+/g, date.getHours());
    format = self.getProperDigits(
      format,
      /h+/g,
      self.getHours12(date.getHours())
    );
    format = self.getProperDigits(format, /m+/g, date.getMinutes());
    format = self.getProperDigits(format, /s+/gi, date.getSeconds());
    format = format.replace(/a/gi, function (a) {
      const amPm = self.getAmPm(date.getHours());
      if (a === 'A') return amPm.toUpperCase();
      return amPm;
    });
    format = self.getFullOr3Letters(
      format,
      /d+/gi,
      self.dayNames,
      date.getDay()
    );
    format = self.getFullOr3Letters(
      format,
      /M+/g,
      self.monthNames,
      date.getMonth()
    );
    return format;
  },
  getProperDigits: function (format, regex, value) {
    return format.replace(regex, function (m) {
      const length = m.length;
      if (length == 1) return value;
      else if (length == 2) return ('0' + value).slice(-2);
      return m;
    });
  },
  getHours12: function (hours) {
    return (hours + 24) % 12 || 12;
  },
  getAmPm: function (hours) {
    return hours >= 12 ? 'pm' : 'am';
  },
  getFullOr3Letters: function (format, regex, nameArray, value) {
    return format.replace(regex, function (s) {
      const len = s.length;
      if (len == 3) return nameArray[value].substr(0, 3);
      else if (len == 4) return nameArray[value];
      return s;
    });
  },
};

module.exports = DateFormatter;
