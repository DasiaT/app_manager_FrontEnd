
export function obtenerDatosUsuario() {

    const user = localStorage.getItem('loginData');//DATOS DEL LOCALSTORAGE

    if (user) {
        const localStorageObject = JSON.parse(user);
        
        if (localStorageObject && localStorageObject.result && localStorageObject.result.length > 0) {
            const usuario = localStorageObject.result[0];
            const datosUsuario = {
                id: usuario.id,
                userName: usuario.user_Name,
                userId: usuario.user_Id,
                informationUser: {
                    id: usuario.information_User.id,
                    name: usuario.information_User.name,
                    surnames: usuario.information_User.surnames,
                    email: usuario.information_User.email,
                    dni: usuario.information_User.dni,
                    description: usuario.information_User.description,
                    state: usuario.information_User.state,
                    idWorkstation: usuario.information_User.id_workstation,
                    informationWorkstation: {
                        id: usuario.information_User.information_Workstation.id,
                        name: usuario.information_User.information_Workstation.name
                    }
                },
                state: usuario.state,
                token: usuario.token,
                expiresInMinutes: usuario.expiresInMinutes,
                userApplicationRol: usuario.user_Application_Rol
            };
            return datosUsuario;
        } else {
            console.error('No se proporcionaron datos de usuario válidos.');
            return null;
        }
    }
}

