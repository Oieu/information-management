const CheckUser = (loginStatus, user, nav) => {
  if (loginStatus === true) {
    if (user.userRole === "ADMIN") {
      nav("/admin");
    } else if(user.userRole === "MEMBER" || user.userRole === "ADMIN") {
      nav("/");
    }
  }
};

export default CheckUser;
