import API from './axios.config'

/*export const IniciarSesion = body => {
  return API.post('/login/', body, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}*/

export const IniciarSesion = async body => {
  try {
    const response = await API.post('user/login/', body, {
      validateStatus: function (status) {
        return status < 500 // Acepta cualquier estado menor a 500
      }
    })

    return response
  } catch (error) {
    console.error('Error en IniciarSesion:', error)
    throw error
  }
}

export const obtnerUsuarios = () => {
  return API.get('user/usuarios/', {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerUsuarioPorId = async id => {
  return API.get(`user/usuarios/${id}`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const AgregarUsuario = body => {
  return API.post(`user/usuarios/`, body, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const EliminarUsuario = async id => {
  return await API.delete(`user/usuarios/${id}`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerRoles = () => {
  return API.get(`roles/simple/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerPaises = () => {
  return API.get(`user/countries/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtnerTipoDocIdentidad = () => {
  return API.get(`user/typedocs/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const EditarUsuario = async id => {
  return API.put(`user/usuarios/${id}/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const ObteneridRol = async idRol => {
  return API.get(`roles/role/${idRol}/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const ActualizarUsuario = async (id, body) => {
  try {
    const response = await API.put(`user/usuarios/${id}/`, body, {
      validateStatus: function (status) {
        return status < 500
      }
    })

    return response
  } catch (error) {
    console.error('Error en ActualizarUsuario:', error)
    throw error
  }
}

export const ActualizarUsuarioEstados = async (id, datosActualizados) => {
  try {
    const response = await API.put(`user/usuarios/${id}/`, datosActualizados, {
      validateStatus: function (status) {
        return status < 500; // Aceptar códigos de estado < 500
      }
    });

    if (response.status >= 200 && response.status < 300) {
      // La actualización fue exitosa
      return response.data;
    } else {
      // Manejar errores específicos del servidor
      console.error('Error al actualizar el estado:', response.status, response.statusText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  } catch (error) {
    // Manejar errores de la solicitud
    console.error('Error en la solicitud:', error);
    throw error;
  }
};




export const obtenerTodosLosPermisos = () => {
  return API.get('permisos/permiso/', {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerEcenariosporid = async idEcenario => {
  return API.get(`user/usuarios/${idEcenario}/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerEscenarios = () => {
  return API.get('escenario/escenario/', {
    validateStatus: function (status) {
      return status < 500
    }
  })
}
