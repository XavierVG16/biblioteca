export class Usuario {
    constructor(id_usuario = '',nombres='', apellidos='', ci ='',email='', pass_usuario='', t_usuario='', telefono='', pass=''){
        this.nombres = nombres,
        this.apellidos = apellidos,
        this.email =email,
        this.ci = ci,
        this.pass_usuario= pass_usuario,
        this.t_usuario = t_usuario,
        this.telefono = telefono,
        this.id_usuario = id_usuario
        this.pass = pass
    }
    id_usuario: string;
    nombres: string;
     apellidos: string;
     email: string;
     ci: string;
     pass_usuario: string;
     t_usuario: string;
     telefono: string;
     pass: string;
}

