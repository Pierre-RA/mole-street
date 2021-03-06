import { DailyQuote, SixthlyQuote } from '../../shared';

export class Text {

  static getUniqueInitials(name: string, list: Array<string>): string {
    const split = name.split(' ');
    const primary = split.map(word => word.slice(0, 1)).join('');
    const alternate = split.map(word => word.slice(1, 2)).join('');
    let result: Array<string>;
    result = [];

    if (list.length < 20) {
      result.push(primary);
    }
    result.push(primary[0] + alternate[0] + primary.slice(1));
    result.push(primary.slice(0, 2) + alternate[1] + primary.slice(2));
    result.push(primary[0] + alternate.slice(0, 1) + primary.slice(2));

    for (let i = 0; i < result.length; i++) {
      if (list.indexOf(result[i]) === -1) {
        return result[i].toUpperCase();
      }
    }
    return null;
  }

  static insertAtQuote(quote: DailyQuote, values: SixthlyQuote, date: Date): DailyQuote {
    let hour = date.getHours();
    let minutes = date.getMinutes();
    if (hour < 8 || hour > 16) {
      hour = 8;
      minutes = 0;
    }
    const sixth = Math.floor(minutes / 10);
    quote.hours[hour][sixth] = values;
    return quote;
  }

  static getEmptyHours () {
    let result;
    result = {};
    for (let i = 8; i < 17; i++) {
      result[i] = {};
      for (let j = 0; j < 6; j++) {
        result[i][j] = {
          volume: null,
          last: null,
          prev: null
        };
      }
    }
    return result;
  }

  static moveChar(char: string): string {
    switch (char) {
      case 'a':
        return 'b';
      case 'b':
        return 'c';
      case 'c':
        return 'd';
      case 'd':
        return 'e';
      case 'e':
        return 'f';
      case 'f':
        return 'g';
      case 'g':
        return 'h';
      case 'h':
        return 'i';
      case 'i':
        return 'j';
      case 'j':
        return 'k';
      case 'k':
        return 'l';
      case 'l':
        return 'm';
      case 'm':
        return 'n';
      case 'n':
        return 'o';
      case 'o':
        return 'p';
      case 'p':
        return 'q';
      case 'q':
        return 'r';
      case 'r':
        return 's';
      case 's':
        return 't';
      case 't':
        return 'u';
      case 'u':
        return 'v';
      case 'v':
        return 'w';
      case 'w':
        return 'x';
      case 'x':
        return 'y';
      case 'y':
        return 'z';
      case 'z':
        return 'a';
    }
  }
}
