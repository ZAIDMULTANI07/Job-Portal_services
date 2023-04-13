import * as bycrpt from 'bcrypt';

export class Hash {
  static saltRound = 10;

  static async make(str: string): Promise<string> {
    return bycrpt.hash(str, Hash.saltRound);
  }

  static async compare(str: string, hash: string): Promise<boolean> {
    return bycrpt.compare(str, hash);
  }
}
