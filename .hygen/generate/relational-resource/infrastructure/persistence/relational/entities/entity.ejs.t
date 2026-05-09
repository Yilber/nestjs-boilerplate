---
to: src/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>/infrastructure/persistence/relational/entities/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>.entity.ts
---
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityRelationalHelperWithTimeStamp } from '../../../../../utils/relational-entity-helper-with-timestamp';
import { <%= name %> } from '../../../../domain/<%= h.inflection.transform(name, ['underscore', 'dasherize']) %>';

@Entity({
  name: '<%= h.inflection.transform(name, ['underscore']) %>',
})
export class <%= name %>Entity extends EntityRelationalHelperWithTimeStamp
  implements <%= name %>
{
  @PrimaryGeneratedColumn()
  id: number | string;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  constructor(data?: <%= name %>) {
    super(data);

    if (data) {
      this.id = Number(data.id);
      this.name = data.name;
    }
  }
}
