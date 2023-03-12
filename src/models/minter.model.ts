import { ApiProperty } from "@nestjs/swagger";

export class Minter {
    @ApiProperty()
    accountAddress: string;
    
    @ApiProperty()
    numberOfTokens: number;

    constructor(accountAddress: string, numberOfTokens: number) {
        this.accountAddress = accountAddress;
        this.numberOfTokens = numberOfTokens;
    }
}