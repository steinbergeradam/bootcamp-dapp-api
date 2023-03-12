import { ApiProperty } from "@nestjs/swagger";

export class PaymentOrder {
    @ApiProperty()
    id: number;
    @ApiProperty()
    secret: string;
    @ApiProperty()
    value: number;
}