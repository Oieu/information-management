const CheckUser = (loginStatus, user, nav) => {
  if (loginStatus === true) {
    if (user.userRole === "ADMIN") {
      nav("/admin");
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
