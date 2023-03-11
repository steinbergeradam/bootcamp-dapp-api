import { ApiProperty } from "@nestjs/swagger";

export class Delegation {
    @ApiProperty()
    senderPrivateKey: string;
    
    @ApiProperty()
    recipientAddress: string;

    constructor(senderPrivateKey: string, recipientAddress: string) {
        this.senderPrivateKey = senderPrivateKey;
        this.recipientAddress = recipientAddress;
    }
}