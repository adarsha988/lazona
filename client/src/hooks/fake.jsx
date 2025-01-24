export const AdminRoutes = ({ children, role }) => {
  return (
    <>
      {isLoggedIn() && isAdmin(role) ? (
        children
      ) : isLoggedIn() && !isAdmin(role) ? (
        <Navigate replace to={"/admin/dashboard"} />
      ) : (
        <Navigate replace to={"/login"} />
      )}
    </>
  );
};

export const PrivateRoutes = ({ children }) => {
  return (
    <>
      {isLoggedIn() ? <Navigate replace to={"/admin/dashboard"} /> : children}
    </>
  );
};
