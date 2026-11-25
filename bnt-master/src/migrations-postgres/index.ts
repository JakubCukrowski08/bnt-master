import * as migration_20261125_154224_initial from './20261125_154224_initial';

export const migrations = [
  {
    up: migration_20261125_154224_initial.up,
    down: migration_20261125_154224_initial.down,
    name: '20261125_154224_initial'
  },
];
