import { ApiProperty } from "@nestjs/swagger";

export class Delegation {
    @ApiProperty()
    senderPrivateKey: string;
    @ApiProperty()
    recipientAddress: string;
}