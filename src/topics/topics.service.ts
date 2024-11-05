import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicsService {
	private readonly logger = new Logger(TopicsService.name);

	constructor(
		@InjectRepository(Topic)
		private readonly topicsRepository: Repository<Topic>,
	) {}

	async create(createTopicDto: CreateTopicDto) {

		let topic: Topic;
		const queryBuilder = this.topicsRepository.createQueryBuilder('topic');
		
		topic = await queryBuilder
			.where('LOWER(topic) = LOWER(:topic)', {
				topic: createTopicDto.topic,
				isDeleted: false
			})
			.getOne();

		if (topic) {
			throw new BadRequestException('Topic already exists');
		}

		try {
			const topic = this.topicsRepository.create(createTopicDto);
			await this.topicsRepository.save(topic);
			return topic;
		} catch (error) {
			this.handleUnexpectedError(error);
		}
	}

	findAll(paginationDto: PaginationDto) {
		const { limit = 10, offset = 0 } = paginationDto;
		return this.topicsRepository.find({
			where: { isDeleted: false },
			take: limit,
			skip: offset,
			order: { isDefault: 'DESC', order: 'ASC' },
		});
	}

	async findOne(id: string) {
		const topic = await this.topicsRepository.findOneBy({
			id,
			isDeleted: false,
		});
		if (!topic) {
			throw new NotFoundException(`Topic with ID ${id} not found`);
		}

		return topic;
	}

	async update(id: string, updateTopicDto: UpdateTopicDto) {
		const topic = await this.topicsRepository.preload({
			id,
			...updateTopicDto,
		});

		if (!topic) {
			throw new NotFoundException(`Topic with ID ${id} not found`);
		}

		return this.topicsRepository.save(topic);
	}

	async remove(id: string) {
		const topic = await this.findOne(id);
		if (topic.isDefault) {
			throw new BadRequestException('Default topics cannot be deleted');
		}

		return this.topicsRepository.update(
			{ id: topic.id },
			{ isDeleted: true },
		);
	}

	handleUnexpectedError(error: any) {
		this.logger.error(error.detail, error.stack);
		throw new InternalServerErrorException(
			'Unexpected error occurred. Check logs for details.',
		);
	}
}
