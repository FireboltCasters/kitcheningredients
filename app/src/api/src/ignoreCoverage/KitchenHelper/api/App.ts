import { UserItem, RoleItem, Directus } from '@directus/sdk';
import { ConfigHolder } from './ConfigHolder';
import ConnectionStatus from './ConnectionStatus';

export default class App {

  static readonly config = ConfigHolder;

  static useConnectionStatus() {

  }

  static getConnectionStatus(): ConnectionStatus | any {

  }

  static useSyncedUser() {

  }

  static getUser(): UserItem | any {

  }

  static useSyncedRole() {

  }

  static getRole(): RoleItem | any {

  }

  static async logout() {

  }

  static getDirectus(): Directus<any> | any {

  }

  static getServerInfo() {

  }

  static useServerInfo() {

  }

  static useDevice() {

  }
}
