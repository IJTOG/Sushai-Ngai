import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";
import {
    Category,
    Gallery,
    Bill,
    User,
    List
} from './'

@Entity()
export default class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name_th: string;

    @Column()
    name_en: string;

    @Column()
    price: number;

    @Column("text")
    detail: string;

    @Column()
    quantity: number;

    @OneToMany(type => List,list => list.product_id)
    lists:List[]

    @ManyToOne(type => Category, catagory => catagory.products)
    categories_id: Category;

    @ManyToOne(type => Gallery)
    galleries_id:Gallery

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}