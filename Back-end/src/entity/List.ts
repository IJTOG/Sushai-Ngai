import {
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable
} from "typeorm";
import {
    Category,
    Bill,
    User,
    Product
} from './'

@Entity()
export default class List {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    qty:number; 

    @ManyToOne(type => Bill, bill => bill.lists)
    bill_id: Bill;

    @ManyToOne(type => Product, product => product.lists)
    product_id: Product;

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}