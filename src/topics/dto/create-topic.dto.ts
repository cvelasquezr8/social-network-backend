import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTopicDto {
	@IsString()
	@MinLength(1)
	@MaxLength(50)
	topic: string;

	@IsBoolean()
	@IsOptional()
	isDefault?: boolean;

	@IsNumber()
	@IsPositive()
	@IsOptional()
	order?: number;

	@IsBoolean()
	@IsOptional()
	isDeleted?: boolean;
}
