const startColumns: any[] = [
  {
    name: 'id',
    type: 'int',
    generationStrategy: 'increment',
    isGenerated: true,
    isPrimary: true,
  },
  {
    name: 'refId',
    type: 'uuid',
    length: '36',
    isNullable: false,
    // isPrimary: false,
    generationStrategy: 'uuid',
    // default: 'uuid_generate_v4()', // For Postgres
  },
];

const endColumns: any[] = [
  {
    name: 'createdAt',
    type: 'datetime',
    length: '6',
    default: 'CURRENT_TIMESTAMP(6)',
  },
  {
    name: 'createdById',
    type: 'int',
    isNullable: false,
  },
  {
    name: 'updatedAt',
    type: 'datetime',
    length: '6',
    default: 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  },
  {
    name: 'updatedById',
    type: 'int',
    isNullable: false,
  },
  {
    name: 'deletedAt',
    type: 'datetime',
    length: '6',
    isNullable: true,
  },
  {
    name: 'deletedById',
    type: 'int',
    isNullable: true,
  },
];

export function getColumns(extraColumns: any[]) {
  return [...startColumns, ...extraColumns, ...endColumns];
}
