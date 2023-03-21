import { ApiProperty } from "@nestjs/swagger";

export class TokenRequest {
    @ApiProperty()
    address: string;
    @ApiProperty()
    amount: number;
}