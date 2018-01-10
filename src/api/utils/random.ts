const adjectives = require('../../shared/names/adjectives.json');
const names = require('../../shared/names/names.json');
const suffixes = require('../../shared/names/suffixes.json');

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

  static getName(type: string): string {
    const list = names[type].list;
    return list[this.getInt(0, list.length)];
  }

  static getType(): string {
    const list = names;
    let max = 0;
    let name;
    for (name in names) {
      if (names.hasOwnProperty(name)) {
        max += names[name].weight;
      }
    }
    const rand = this.getInt(0, max);
    return this.getTypeFromWeight(list, rand);
  }

  static getTypeFromWeight(list, weight: number): string {
    let i = 0;
    let type = '';
    let name;
    for (name in names) {
      if (names.hasOwnProperty(name)) {
        i += names[name].weight;
        if (i >= weight) {
          type = type ? type : name;
        }
      }
    }
    return type;
  }

  static getSuffix(): string {
    const list = suffixes.suffixes;
    let max = 0;
    for (let i = 0; i < list.length; i++) {
      max += list[i].weight;
    }
    const rand = this.getInt(0, max);
    return this.getSuffixFromWeight(list, rand);
  }

  static getSuffixFromWeight(array: Array<{name: string, weight: number}>, weight: number): string {
    let i = 0;
    let suffix = '';
    array.forEach(item => {
      i += item.weight;
      if (i >= weight) {
        suffix = suffix ? suffix : item.name;
      }
    });
    if (suffix) {
      return ' ' + suffix.trim();
    }
    return '';
  }
}
