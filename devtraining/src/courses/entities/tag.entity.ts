import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { Course } from "./course.entity";

@Entity('tags')
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course: Course) => course.tags  )
  courses: Course[]

  @BeforeInsert()
  genetrateId() {
    if (this.id) return;
 
    this.id = uuidV4();
  }

}
