export class Prestamo {
    constructor(estado_prestamo=0,id_prestamo = '',id_lector='', id_libro='', fecha_devolucion ='', fecha_prestamo = ''){
        this.id_prestamo = id_prestamo
        this.id_lector = id_lector
        this.id_libro = id_libro
        this.fecha_prestamo = fecha_prestamo
        this.fecha_devolucion = fecha_devolucion,
        this.estado_prestamo = estado_prestamo
    }
    id_prestamo: string
    id_lector: string ;
    id_libro: string ;
    fecha_prestamo: string;
    fecha_devolucion: string
    estado_prestamo: number
}
