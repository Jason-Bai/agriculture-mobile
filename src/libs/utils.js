const utils = {
  store: {
    get: (name) => {
      return localStorage.getItem(name)
    },
    set: (name, value) => {
      if (!name || !value) return
      return localStorage.setItem(name, value)
    },
    remove: (name) => {
      if(!name) return
      return localStorage.removeItem(name)
    }
  },
  getToken() {
    return utils.store.get('x-access-token')
  },
  setToken(token)  {
    return utils.store.set('x-access-token', token)
  }
}

export default utils
