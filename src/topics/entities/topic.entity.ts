import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Topic {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	
	@Column('text', {
		nullable: false,
		unique: true
	})
	topic: string;

	@Column('boolean', {
		default: false
	})
	isDefault: boolean;

	@Column('numeric', {
		default: 999
	})
	order: number;

	@Column('boolean', {
		default: false
	})
	isDeleted?: boolean;

}
