import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '../../entities/Admin';

export class LoginResponseDto {
    @ApiProperty({
        example: {
            id: 1,
            login: 'admin1',
            lookupKey: 'abc123...'
        }
    })
    admin: {
        id: number;
        login: string;
        lookupKey: string;
    };

    @ApiProperty({ example: 'generated-jwt-token' })
    token: string;

    constructor(admin: Admin, token: string) {
        this.admin = {
            id: admin.id,
            login: admin.login,
            lookupKey: admin.lookupKey,
        };
        this.token = token;
    }
}