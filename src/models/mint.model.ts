import { ApiProperty } from "@nestjs/swagger";

export class Mint {
    @ApiProperty()
    address: string;
    @ApiProperty()
    tokens: number;
}