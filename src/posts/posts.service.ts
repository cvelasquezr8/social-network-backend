import {
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Post, PostImage } from './entities';

@Injectable()
export class PostsService {
	private readonly logger = new Logger(PostsService.name);

	constructor(
		@InjectRepository(Post)
		private readonly postsRepository: Repository<Post>,

		@InjectRepository(PostImage)
		private readonly postImagesRepository: Repository<PostImage>,
	) {}

	async create(createPostDto: CreatePostDto) {
		try {
			const { images = [], ...postDetails } = createPostDto;
			const post = this.postsRepository.create({
				...postDetails,
				images: images.map((image) => this.postImagesRepository.create({ url: image })),
			});

			await this.postsRepository.save(post);

			return { ...post, images };
		} catch (error) {
			this.handleUnexpectedError(error);
		}
	}

	async findAll(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto;
		const posts = await this.postsRepository.find({
			take: limit,
			skip: offset,
			relations: {
				images: true,
			},
		});

		return posts.map(({ images, ...postDetails}) => ({
			...postDetails,
			images: images.map((image) => image.url),
		}))
	}

	async findOne(id: string) {
		const post = await this.postsRepository.findOneBy({ id });
		if (!post) {
			throw new NotFoundException(`Post with ID ${id} not found`);
		}

		return post;
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		return `This action updates a #${id} post`;
	}

	async remove(id: string) {
		try {
			const post = await this.findOne(id);
			await this.postsRepository.remove(post);
		} catch (error) {
			this.handleUnexpectedError(error);
		}
	}

	handleUnexpectedError(error: any) {
		this.logger.error(error.message, error.stack);
		throw new InternalServerErrorException(
			'Unexpected error occurred. Check logs for details.',
		);
	}
}
