import { IsArray, IsBoolean, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
	@IsString()
	@MinLength(1)
	@MaxLength(150)
	title: string;

	@IsString()
	@MinLength(1)
	@MaxLength(300)
	description: string;

	@IsNumber()
	@IsPositive()
	@IsOptional()
	likes?: number;

	@IsBoolean()
	@IsOptional()
	isPrivate?: boolean;

	@IsString({ each: true })
	@IsArray()
	@IsOptional()
	images?: string[];
}
