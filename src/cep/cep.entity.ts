import {Column, Entity} from 'typeorm';
import {PrimaryColumn, UpdateDateColumn} from "typeorm/index";

@Entity('postalcodemembers')
export class CepEntity {
    @PrimaryColumn({name: 'secure_id', type: 'varchar', length: 100})
    secure_id: string;

    @Column({name: 'gender', type: 'varchar', length: 100, nullable: true})
    gender: string;

    @Column({name: 'dateofbirth', type: 'numeric', nullable: true})
    dateofbirth: string;

    @Column({name: 'postalcode', type: 'varchar', length: 100, nullable: true})
    postalcode: string;

    @Column({name: 'created', type: 'numeric', nullable: true})
    created: string;

    @Column({name: 'modified', type: 'numeric', nullable: true})
    modified: string;

    @Column({name: 'cep', type: 'varchar', length: 20, nullable: true})
    cep: string;

    @Column({name: 'logradouro', type: 'varchar', length: 1000, nullable: true})
    logradouro: string;

    @Column({name: 'complemento', type: 'varchar', length: 100, nullable: true})
    complemento: string;

    @Column({name: 'bairro', type: 'varchar', length: 200, nullable: true})
    bairro: string;


    @Column({name: 'localidade', type: 'varchar', length: 200, nullable: true})
    localidade: string;

    @Column({name: 'uf', type: 'varchar', length: 2, nullable: true})
    uf: string;

    @Column({name: 'unidade', type: 'varchar', length: 100, nullable: true})
    unidade: string;

    @Column({name: 'ibge', type: 'varchar', length: 20, nullable: true})
    ibge: string;

    @Column({name: 'gia', type: 'varchar', length: 20, nullable: true})
    gia: string;

    @Column({name: 'lat', type: 'decimal', precision: 10, scale: 7, nullable: true})
    lat: number;

    @Column({name: 'lon', type: 'decimal', precision: 10, scale: 7, nullable: true})
    lon: number;

    @Column({name: 'executed', type: 'bit', nullable: true})
    executed: boolean;

    @UpdateDateColumn({name: 'dat_updated', type: 'datetime', nullable: true})
    updatedAt: Date;

    @Column({name: 'responseXML', type: 'varchar', length: 4000, nullable: true})
    responseXML: string;

    @Column({name: 'responseJSON', type: 'varchar', length: 4000, nullable: true})
    responseJSON: string;

    @Column({name: 'dne', type: 'bit', nullable: true})
    dne: boolean;
}
