import {
    Entity, 
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinColumn,
    JoinTable,
    OneToOne,
    OneToMany
} from "typeorm";
import {Product,Gallery,Bill} from './'

@Entity()
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    tel: string;

    @Column()
    email: string;

    @Column()
    is_admin: boolean;

    @Column("text")
    address: string;

    @Column("uuid")
    username: string;

    @Column("text")
    password: string;

    @OneToOne(type => Gallery)
    @JoinColumn()
    gallery_id: Gallery;

    @OneToMany(type => Bill, bill=>bill.user_id)
    bill_id:Bill[]

    @CreateDateColumn({type: "timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}
