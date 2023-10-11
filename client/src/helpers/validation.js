
export default function validation(create){
    const regexNombre = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
    const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
    const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
    const regexTexto = /\S/;
    const errors = {};
  
    if(create.name.surname.length === 0){
        errors.description = "este campo no puede estar vacio"
    }
    if(create.name.surname.length === 0){
        errors.description = "este campo no puede estar vacio"
    }
    if(create.dob.length === 0){
        errors.description = "este campo no puede estar vacio"
    }
    if(create.nationalitylength === 0){
        errors.description = "este campo no puede estar vacio"
    }
  
    if(!regexNombre.test(create.name.forename)){
        errors.forename = "El nombre tiene que tener mayuscula"
    }
    if(!regexNombre.test(create.name.surname)){
        errors.surname = "El apellido tiene que tener mayuscula"
    }
    if(!regexURL.test(create.image.url)){
        errors.url = "Tiene que ser una URL"
    }
    if(!regexFecha.test(create.dob)){
        errors.dob = "El formato de fecha tiene que ser YYYY-MM-DD"
    }
    if(!regexTexto.test(create.teams)){
        errors.teams = "Tienes que selecionar al menos un equipo"
    }
    if(!regexTexto.test(create.nationality)){
        errors.nationality = "Este campo no puede estar vacio"
    }
    if(!regexTexto.test(create.description)){
        errors.description = "Este campo no puede estar vacio"
    }
    
    if(create.description.length > 226){
        errors.description = "No debe sobrepasar los 225 caracteres"
    }

    if(create.name.forename.length > 15){
        errors.description = "No debe sobrepasar los 15 caracteres"
    }
    
    if(create.name.surname.length > 15){
        errors.description = "No debe sobrepasar los 15 caracteres"
    }
   

return errors;


}