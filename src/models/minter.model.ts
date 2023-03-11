import { ApiProperty } from "@nestjs/swagger";
import { BigNumber } from "ethers";

export class Minter {
    @ApiProperty()
    accountAddress: string;
    
    @ApiProperty()
    numberOfTokens: BigNumber;

    constructor(accountAddress: string, numberOfTokens: BigNumber) {
        this.accountAddress = accountAddress;
        this.numberOfTokens = numberOfTokens;
    }
}