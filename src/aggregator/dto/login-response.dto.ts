import { ApiProperty } from '@nestjs/swagger';
import { Aggregator } from '../../entities/Aggregator';

export class LoginResponseDto {
    @ApiProperty({
        example: {
            id: 1,
            name: 'Test Aggregator',
            login: 'aggregator1',
            lookupKey: 'abc123...'
        }
    })
    aggregator: {
        id: number;
        name: string;
        login: string;
        lookupKey: string;
    };

    @ApiProperty({ example: 'generated-jwt-token' })
    token: string;

    constructor(aggregator: Aggregator, token: string) {
        this.aggregator = {
            id: aggregator.id,
            name: aggregator.name,
            login: aggregator.login,
            lookupKey: aggregator.lookupKey,
        };
        this.token = token;
    }
}