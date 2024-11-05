import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { PostImage } from "./post-image.entity";

@Entity()
export class Post {

	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column('text', {
		nullable: false
	})
	title: string;

	@Column('text', {
		nullable: false
	})
	description: string;

	@Column('numeric', {
		default: 0,
	})
	likes: number;

	@Column('boolean', {
		default: false,
	})
	isPrivate: boolean;

	@OneToMany(
		() => PostImage,
		postImage => postImage.post,
		{ cascade: true }
	)
	images?: PostImage[];
}
