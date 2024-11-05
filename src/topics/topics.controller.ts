import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Version,
	Query,
	ParseUUIDPipe,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('topics')
export class TopicsController {
	constructor(private readonly topicsService: TopicsService) {}

	@Version('1')
	@Post()
	create(@Body() createTopicDto: CreateTopicDto) {
		return this.topicsService.create(createTopicDto);
	}

	@Version('1')
	@Get()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.topicsService.findAll(paginationDto);
	}

	@Version('1')
	@Get(':id')
	findOne(@Param('id', ParseUUIDPipe) id: string) {
		return this.topicsService.findOne(id);
	}

	@Version('1')
	@Patch(':id')
	update(
		@Param('id', ParseUUIDPipe) id: string,
		@Body() updateTopicDto: UpdateTopicDto,
	) {
		return this.topicsService.update(id, updateTopicDto);
	}

	@Version('1')
	@Delete(':id')
	remove(@Param('id', ParseUUIDPipe) id: string) {
		return this.topicsService.remove(id);
	}
}
