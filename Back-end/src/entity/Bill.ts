import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from "typeorm";
import {
    User,
    Product,
    List
} from './'

@Entity()
export default class Bill {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    status: string;

    @OneToMany(type => List,list => list.bill_id)
    lists:List[]

    @ManyToOne(type => User ,user => user.bill_id)
    user_id:User

    @CreateDateColumn({type: "timestamp"})
    bill_date: Date;

    @UpdateDateColumn({type: "timestamp"})
    updated_at: Date;
}