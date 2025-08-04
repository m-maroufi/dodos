type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  return <div>{children}</div>;
};

export default ProtectedRoute;
