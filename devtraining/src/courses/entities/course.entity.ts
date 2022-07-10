import { Tag } from './tag.entity';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, JoinTable, ManyToMany } from "typeorm";
import { v4 as uuidV4 } from 'uuid';

@Entity('courses')
class Course {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
  
  @JoinTable()
  @ManyToMany(() => Tag, (tag: Tag) => tag.courses  )
  tags: string[]

  @BeforeInsert()
  genetrateId() {
    if (this.id) return;
 
    this.id = uuidV4();
  }

}
export { Course };
