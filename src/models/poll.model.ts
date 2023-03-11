import { ApiProperty } from "@nestjs/swagger";
import { BigNumber } from "ethers";

export class Poll {
    @ApiProperty()
    proposals: string[];

    @ApiProperty()
    tokenAddress: string;

    @ApiProperty()
    blockNumber: BigNumber;

    constructor(proposals: string[], tokenAddress: string, blockNumber: BigNumber) {
        this.proposals = proposals;
        this.tokenAddress = tokenAddress;
        this.blockNumber = blockNumber;
    }
}