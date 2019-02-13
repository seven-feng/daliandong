const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  username: state => state.user.username,
  phone: state => state.user.phone,
  deptid: state => state.user.deptid,
  deptname: state => state.user.deptname
}
export default getters
