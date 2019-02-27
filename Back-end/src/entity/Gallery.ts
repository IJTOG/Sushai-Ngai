import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import Product from './Product';

@Entity()
export default class Gallery {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    alt_name: string;

    @Column("text")
    location_pic: string;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}