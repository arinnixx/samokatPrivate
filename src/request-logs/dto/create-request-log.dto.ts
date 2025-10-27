import {CreateHandbookDto} from "../../base/dto/base.dto";
import {Aggregator} from "../../entities/Aggregator";
import {IsNotEmpty} from "class-validator";

export class CreateRequestLogDto extends CreateHandbookDto {

    @IsNotEmpty()
    aggregator: Aggregator;

    @IsNotEmpty()
    request_data: any;
}
