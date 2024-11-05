import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post, PostImage } from './entities';

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [TypeOrmModule.forFeature([Post, PostImage])],
})
export class PostsModule {}
