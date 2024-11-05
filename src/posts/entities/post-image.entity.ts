import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./";


@Entity()
export class PostImage {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	url: string;

	@ManyToOne(
		() => Post,
		post => post.images,
	)
	post: Post
}