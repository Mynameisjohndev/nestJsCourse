import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

@Entity('courses')
class Course {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @Column('json', { nullable: true })
  tags: string[];

  @BeforeInsert()
  genetrateId() {
    if (this.id) return;
 
    this.id = uuidV4();
  }

}
export { Course };
