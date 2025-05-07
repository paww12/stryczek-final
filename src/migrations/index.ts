import * as migration_20250507_151507 from './20250507_151507';

export const migrations = [
  {
    up: migration_20250507_151507.up,
    down: migration_20250507_151507.down,
    name: '20250507_151507'
  },
];
