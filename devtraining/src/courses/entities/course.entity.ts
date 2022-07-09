import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity('courses')
class Course {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column('json', { nullable: true })
  tags: string[];
}
export { Course };
