import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  /**
   * @param userID GitHub login
   * @returns whether the user had to be newly created
   */
  createOrUpdateUser(userID: string): boolean | PromiseLike<boolean> {
    throw new Error('Method not implemented.');
  }
}
