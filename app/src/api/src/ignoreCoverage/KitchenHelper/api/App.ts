import { UserItem, RoleItem, Directus } from '@directus/sdk';
import { ConfigHolder } from './ConfigHolder';
import ConnectionStatus from './ConnectionStatus';

export default class App {

  static readonly config = ConfigHolder;

  static useConnectionStatus() {

  }

  static getConnectionStatus(): ConnectionStatus {

  }

  static useSyncedUser() {

  }

  static getUser(): UserItem {

  }

  static useSyncedRole() {

  }

  static getRole(): RoleItem {

  }

  static async logout() {

  }

  static getDirectus(): Directus<any> {

  }

  static getServerInfo() {

  }

  static useServerInfo() {

  }

  static useDevice() {

  }
}
