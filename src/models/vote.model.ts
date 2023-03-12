import { ApiProperty } from "@nestjs/swagger";

export class Vote {
    @ApiProperty()
    voterPrivateKey: string;

    @ApiProperty()
    proposalNumber: number;

    @ApiProperty()
    numberOfVotes: number;

    constructor(voterPrivateKey: string, proposalNumber: number, numberOfVotes: number) {
        this.voterPrivateKey = voterPrivateKey;
        this.proposalNumber = proposalNumber;
        this.numberOfVotes = numberOfVotes;
    }
}