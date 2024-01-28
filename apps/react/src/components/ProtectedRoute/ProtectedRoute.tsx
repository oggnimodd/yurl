import { FC } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  path: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, path }) => {
  const { redirectToSignIn } = useClerk();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    // TODO: add loading indicator
    return null;
  }

  if (!isSignedIn) {
    redirectToSignIn({
      afterSignInUrl: path,
      afterSignUpUrl: path,
    });
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
