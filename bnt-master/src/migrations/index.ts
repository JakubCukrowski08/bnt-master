import * as migration_20261124_210928_initial from './20261124_210928_initial';
import * as migration_20261125_144743_add_cookie_table_and_consent_map from './20261125_144743_add_cookie_table_and_consent_map';
import * as migration_20261125_152732_localize_entry_slugs from './20261125_152732_localize_entry_slugs';

export const migrations = [
  {
    up: migration_20261124_210928_initial.up,
    down: migration_20261124_210928_initial.down,
    name: '20261124_210928_initial',
  },
  {
    up: migration_20261125_144743_add_cookie_table_and_consent_map.up,
    down: migration_20261125_144743_add_cookie_table_and_consent_map.down,
    name: '20261125_144743_add_cookie_table_and_consent_map',
  },
  {
    up: migration_20261125_152732_localize_entry_slugs.up,
    down: migration_20261125_152732_localize_entry_slugs.down,
    name: '20261125_152732_localize_entry_slugs'
  },
];
