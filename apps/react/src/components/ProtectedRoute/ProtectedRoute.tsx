import { FC } from "react";
import { useAuth, useClerk } from "@clerk/clerk-react";

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
  } else {
    return children;
  }
};

export default ProtectedRoute;
