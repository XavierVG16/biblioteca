export class Lector {
    constructor(id_lector = '' , nombres = '', apellidos = '', ci= '', telefono = '', direccion= '', tipolector='' ){
        this.id_lector = id_lector,
        this.nombres = nombres,
        this.apellidos= apellidos,
        this.ci = ci,
        this.telefono= telefono,
        this.direccion = direccion,
        this.tipolector = tipolector
    }
    id_lector: string;
    nombres: string;
    apellidos: string;
    ci: string;
    telefono: string;
    direccion: string;
    tipolector: string;
}
