import {IsEmpty} from 'class-validator';

export class CreateHandbookDto {
    @IsEmpty({message: 'Поле "id" не допускается'})
    id: number;
    @IsEmpty({message: 'Поле "created_at" не допускается'})
    created_at: any;
}

export class UpdateHandbookDto extends CreateHandbookDto {

    @IsEmpty({message: 'Поле "created_at" не допускается'})
    created_at: any;
}
