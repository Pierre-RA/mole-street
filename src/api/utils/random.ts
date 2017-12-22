const adjectives = require('../../shared/names/adjectives.json');
const names = require('../../shared/names/names.json');

export class Random {

  static getDouble(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  static getInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static getDecimal(min: number, max: number): number {
    return this.getInt(min * 100, max * 100) / 100;
  }

  static getAdjective(): string {
    const list = adjectives.adjectives;
    return list[this.getInt(0, list.length)];
  }

  static getName(): string {
    const list = names.names;
    return list[this.getInt(0, list.length)];
  }
}
