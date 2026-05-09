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
    type: 'varchar',
    length: '36',
    isNullable: false,
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
