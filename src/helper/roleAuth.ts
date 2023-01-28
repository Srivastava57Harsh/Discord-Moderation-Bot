/// -------------------------------------------------------------------------------------- #
/// ** Role authenticator **
/// Helper for checking what roles a user has
/// -------------------------------------------------------------------------------------- #
import { GuildMember } from 'discord.js';

/**
 * Check for access for commands
 *
 * @param {GuildMember | null} user
 * @param {Array<string>} roles
 */
export async function checkForAccessByRoles(user: GuildMember | null, roles: Array<string>) {
  let hasRole = false;
  roles.forEach(findrole => {
    if (user && user.roles.cache.has(findrole)) {
      hasRole = true;
    }
  });
  return hasRole;
}
