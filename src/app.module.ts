import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { TopicsModule } from './topics/topics.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { CommonModule } from './common/common.module';

@Module({
	imports: [
		TopicsModule,
		// MongooseModule.forRoot('mongodb ://localhost:27017/social-media'),
		ConfigModule.forRoot(),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			autoLoadEntities: true,
			synchronize: true,
		}),
		PostsModule,
		CommonModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
