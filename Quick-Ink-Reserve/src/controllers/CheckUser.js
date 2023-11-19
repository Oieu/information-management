const CheckUser = (loginStatus, user, nav, location) => {
  if (loginStatus === true) {
    if (user.userRole === "ADMIN") {

      switch(location.pathname) {
        case "/admin":
          nav("/admin");
          break;
        case "/admin/materials":
          nav("/admin/materials");
          break;
        case "/admin/services":
          nav("/admin/services");
          break;
        case "/admin/users":
          nav("/admin/users");
          break;
        case "/admin/orders":
          nav("/admin/orders");
          break;
        case "/admin/analytics":
          nav("/admin/analytics");
          break;
        default:
          nav("/admin");
          break;
      }
    } else if(user.userRole === "MEMBER") {
      nav("/");
    }
  }
};

export const CheckAdmin = (user) => {
  return user.userRole === "ADMIN";
}

export const CheckMember = (user) => {
  return user.userRole === "ADMIN" || user.userRole === "MEMBER";
}

export default CheckUser;
