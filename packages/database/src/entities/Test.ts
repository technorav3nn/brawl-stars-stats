import { Entity, PrimaryKey } from "@mikro-orm/core";

@Entity()
export class Test {
    @PrimaryKey({ autoincrement: true })
    id!: number;
}
