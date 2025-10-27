import {CreateHandbookDto} from "../../base/dto/base.dto";
import {IsNotEmpty} from "class-validator";

export class CreateDeliveryStatusDto extends CreateHandbookDto {
    @IsNotEmpty()
    status_name: string;
}
