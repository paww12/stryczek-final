import * as migration_20250427_191117_initial from './20250427_191117_initial';

export const migrations = [
  {
    up: migration_20250427_191117_initial.up,
    down: migration_20250427_191117_initial.down,
    name: '20250427_191117_initial'
  },
];
