import { ApiProperty } from "@nestjs/swagger";
import { BigNumber } from "ethers";

export class Vote {
    @ApiProperty()
    voterPrivateKey: string;

    @ApiProperty()
    proposalNumber: BigNumber;

    @ApiProperty()
    numberOfVotes: BigNumber;

    constructor(voterPrivateKey: string, proposalNumber: BigNumber, numberOfVotes: BigNumber) {
        this.voterPrivateKey = voterPrivateKey;
        this.proposalNumber = proposalNumber;
        this.numberOfVotes = numberOfVotes;
    }
}