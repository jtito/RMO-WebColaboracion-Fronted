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
    const response = await API.post('/login/', body, {
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
  return API.get('/usuarios/', {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerUsuarioPorId = async id => {
  return API.get(`/usuarios/${id}`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const AgregarUsuario = body => {
  return API.post(`/usuarios/`, body, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const EliminarUsuario = async id => {
  return await API.delete(`/usuarios/${id}`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerRoles = () => {
  return API.get(`/role/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtenerPaises = () => {
  return API.get(`/countries/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const obtnerTipoDocIdentidad = () => {
  return API.get(`/typedocs/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}

export const EditarUsuario = async id => {
  return API.put(`/usuarios/${id}/`, {
    validateStatus: function (status) {
      return status < 500
    }
  })
}
