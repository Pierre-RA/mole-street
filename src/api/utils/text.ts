import { Stock } from '../../shared';

export class Text {

  static getUniqueInitials(adj: string, name: string, list: Array<string>): string {
    let initials = '';
    let found = false;
    let tmp = '';
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        tmp = i === 0 ? adj[0] : adj[0] + adj[i];
        initials = tmp;
        tmp = j === 0 ? name[0] : name[0] + name[j];
        initials += tmp;
        if (list.indexOf(initials) === -1) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (found) {
      return initials;
    }
    return null;
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
