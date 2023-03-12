import { ApiProperty } from "@nestjs/swagger";

export class Minter {
    @ApiProperty()
    accountAddress: string;
    @ApiProperty()
    numberOfTokens: number;
}