export class Helpers {
  static isUuid(str: string): boolean {
    return RegExp(
      /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    ).test(str);
  }
}
