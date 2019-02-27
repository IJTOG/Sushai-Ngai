import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn,UpdateDateColumn, OneToMany,OneToOne} from "typeorm";
import {Product,Gallery} from './';

@Entity()
export default class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_th: string;

    @Column()
    name_en: string;

    @Column("text")
    detail:string

    @OneToMany(type => Product, product => product.categories_id)
    products: Product[];

    @OneToOne(type => Gallery)
    @JoinColumn()
    gallery_id: Gallery;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}