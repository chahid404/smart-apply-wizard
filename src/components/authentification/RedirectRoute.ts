import { routes } from "@/lib/routes";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectRoute = () => {
  const { userId, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate(routes.Applications);
    } else {
      navigate(routes.Home);
    }
  }, [userId, isSignedIn, navigate]);

  return null;
};

export default RedirectRoute;
