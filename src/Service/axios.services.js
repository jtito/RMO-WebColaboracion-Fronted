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
    });

    return response;
  } catch (error) {
    console.error('Error en ActualizarUsuario:', error);
    throw error;
  }
}
