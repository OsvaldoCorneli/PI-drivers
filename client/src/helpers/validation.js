
export default function validation(create){
    const regexNombre = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
    const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    const regexSeleccionado = /^[^\s]+$/;
    const regexTexto = /\S/;
    const errors = {};
  
    if(!regexNombre.test(create.name.forename)){
        errors.forename = "El nombre tiene que tener mayuscula"
    }
    if(!regexNombre.test(create.name.surname)){
        errors.surname = "El nombre tiene que tener mayuscula"
    }
    if(!regexURL.test(create.image.url)){
        errors.url = "Tiene que ser una URL"
    }
    if(!regexFecha.test(create.dob)){
        errors.dob = "El formato de fecha tiene que ser YYYY-MM-DD"
    }
    if(!regexSeleccionado.test(create.teams)){
        errors.teams = "Tienes que selecionar al menos un equipo"
    }
    if(!regexTexto.test(create.nationality)){
        errors.nationality = "Este campo no puede estar vacio"
    }
    if(!regexTexto.test(create.description)){
        errors.description = "Este campo no puede estar vacio"
    }
    



return errors;


}