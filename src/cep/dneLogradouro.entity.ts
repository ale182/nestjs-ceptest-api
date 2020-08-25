import {Column, Entity} from 'typeorm';
import {PrimaryColumn} from "typeorm/index";

@Entity('dneLogradouro')
export class DneLogradouroEntity {

    @PrimaryColumn({name: 'LOG_NU', type: 'numeric', precision: 8})
    LOG_NU: number // chave do logradouro	NUMBER(8)

    @Column({name: 'UFE_SG', type: 'varchar', length: 2, nullable: true})
    UFE_SG: string // sigla da UF	CHAR(2)

    @Column({name: 'LOC_NU', type: 'numeric', precision: 8, nullable: true})
    LOC_NU: string //chave da localidade	NUMBER(8)

    @Column({name: 'BAI_NU_INI', type: 'numeric', precision: 8, nullable: true})
    BAI_NU_INI: number //chave do bairro inicial do logradouro 	NUMBER(8)

    @Column({name: 'BAI_NU_FIM', type: 'numeric', precision: 8, nullable: true})
    BAI_NU_FIM: number //chave do bairro final do logradouro (opcional)	NUMBER(8)

    @Column({name: 'LOG_NO', type: 'varchar', length: 100, nullable: true})
    LOG_NO: string //	nome do logradouro	VARCHAR2(100)

    @Column({name: 'LOG_COMPLEMENTO', type: 'varchar', length: 100, nullable: true})
    LOG_COMPLEMENTO: string //complemento do logradouro (opcional)	VARCHAR2(100)

    @Column({name: 'CEP', type: 'varchar', length: 8, nullable: true})
    CEP: string // CEP do logradouro	CHAR(8)

    @Column({name: 'TLO_TX', type: 'varchar', length: 36, nullable: true})
    TLO_TX: string // tipo de logradouro	VARCHAR2(36)

    @Column({name: 'LOG_STA_TLO', type: 'varchar', length: 1, nullable: true})
    LOG_STA_TLO: string // indicador de utilização do tipo de logradouro (S ou N) (opcional)	CHAR(1)

    @Column({name: 'LOG_NO_ABREV', type: 'varchar', length: 36, nullable: true})
    LOG_NO_ABREV: string //	abreviatura do nome do logradouro (opcional)	VARCHAR2(36)

}
