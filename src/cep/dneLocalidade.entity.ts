import {Column, Entity} from 'typeorm';
import {PrimaryColumn} from "typeorm/index";

@Entity('dneLocalidade')
export class DneLocalidadeEntity {

    @PrimaryColumn({name: 'LOC_NU', type: 'numeric', precision: 8})
    LOC_NU: number //	chave da localidade	NUMBER(8)

    @Column({name: 'UFE_SG', type: 'varchar', length: 2, nullable: true})
    UFE_SG: string // sigla da UF	CHAR(2)

    @Column({name: 'LOC_NO', type: 'varchar', length: 72, nullable: true})
    LOC_NO: string //nome da localidade	VARCHAR(72)

    @Column({name: 'CEP', type: 'varchar', length: 8, nullable: true})
    CEP: string // CEP	CEP da localidade (para  localidade  não codificada, ou seja loc_in_sit = 0) (opcional)	CHAR(8)

    @Column({name: 'LOC_IN_SIT', type: 'varchar', length: 1, nullable: true})
    LOC_IN_SIT: string //	situação da localidade:  0 = não codificada em nível de Logradouro,  1 = Localidade codificada em nível de Logradouro e   2 = Distrito ou Povoado inserido na codificação em nível de Logradouro.	CHAR(1)

    @Column({name: 'LOC_IN_TIPO_LOC', type: 'varchar', length: 1, nullable: true})
    LOC_IN_TIPO_LOC: string //	tipo de localidade: D – Distrito, M – Município, P – Povoado.

    @Column({name: 'LOC_NU_SUB', type: 'numeric', precision: 8, nullable: true})
    LOC_NU_SUB: number //	tipo de localidade: D – Distrito, M – Município, P – Povoado. 	chave da localidade de subordinação (opcional)	NUMBER(8)

    @Column({name: 'LOC_NO_ABREV', type: 'varchar', length: 36, nullable: true})
    LOC_NO_ABREV: string //	abreviatura do nome da localidade (opcional)	VARCHAR(36)

    @Column({name: 'MUN_NU', type: 'varchar', length: 36, nullable: true})
    MUN_NU: string //	Código do município IBGE (opcional)	CHAR(7)










    @Column({name: 'BAI_NU_FIM', type: 'numeric', precision: 8, nullable: true})
    BAI_NU_FIM: number //chave do bairro final do logradouro (opcional)	NUMBER(8)

    @Column({name: 'LOG_NO', type: 'varchar', length: 100, nullable: true})
    LOG_NO: string //	nome do logradouro	VARCHAR2(100)

    @Column({name: 'LOG_COMPLEMENTO', type: 'varchar', length: 100, nullable: true})
    LOG_COMPLEMENTO: string //complemento do logradouro (opcional)	VARCHAR2(100)



    @Column({name: 'TLO_TX', type: 'varchar', length: 36, nullable: true})
    TLO_TX: string // tipo de logradouro	VARCHAR2(36)

    @Column({name: 'LOG_STA_TLO', type: 'varchar', length: 1, nullable: true})
    LOG_STA_TLO: string // indicador de utilização do tipo de logradouro (S ou N) (opcional)	CHAR(1)

    @Column({name: 'LOG_NO_ABREV', type: 'varchar', length: 36, nullable: true})
    LOG_NO_ABREV: string //	abreviatura do nome do logradouro (opcional)	VARCHAR2(36)

}
