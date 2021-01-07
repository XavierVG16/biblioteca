export class Libro {
    constructor (id_libro='' , codigo_libro= '',isbn_libro= '', titulo_libro='', stock_libro='', autor_libro='', editorial_libro='', ediccion_libro= '',    publicacion_libro='', idioma_libro='', ejemplares_libro='', facultad='', prestados_libro= 0, nombre='', fecha_prestamo='', fecha_devolucion = '',estado_prestamo='', id_lector = '' , nombres = '', apellidos = '', ci= '', telefono = '', direccion= '', tipolector='', id_prestamo='',id_usuario='', total= 0){
        this.codigo_libro = codigo_libro,
        this.isbn_libro = isbn_libro,
        this.titulo_libro = titulo_libro,
        this.stock_libro = stock_libro,
        this.autor_libro = autor_libro,
        this.editorial_libro = editorial_libro,
        this.ediccion_libro = ediccion_libro,
        this.publicacion_libro = publicacion_libro,
        this.idioma_libro = idioma_libro
        this.ejemplares_libro = ejemplares_libro,
        this.facultad = facultad,
        this.prestados_libro = prestados_libro,
        this.id_libro= id_libro,
        this.nombre = nombre,
        this.fecha_prestamo=fecha_prestamo,
        this.fecha_devolucion= fecha_devolucion,
        this.estado_prestamo = estado_prestamo,
        this.id_prestamo =  id_prestamo,
        /**lector */
        this.id_lector = id_lector,
        this.nombres = nombres,
        this.apellidos= apellidos,
        this.ci = ci,
        this.telefono= telefono,
        this.direccion = direccion,
        this.tipolector = tipolector
        this.id_usuario = id_usuario
        this.total = total
    }
    id_libro: string
    codigo_libro: string;
    isbn_libro: string;
    titulo_libro: string;
    stock_libro: string;
    autor_libro: string;
    editorial_libro: string;
    ediccion_libro: string;
    publicacion_libro: string;
    idioma_libro: string;
    ejemplares_libro: string;
    facultad: string;
    nombre: string;
    prestados_libro: number;
    fecha_prestamo: string;
    fecha_devolucion: string;
    estado_prestamo: string;
    id_prestamo: string;
    /** lector */
    id_lector: string;
    nombres: string;
    apellidos: string;
    ci: string;
    telefono: string;
    direccion: string;
    tipolector: string;
    id_usuario: string;
    total: number;
}
