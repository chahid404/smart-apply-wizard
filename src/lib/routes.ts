export enum routes {
  APPLY_NOW = "/apply-now",
  Applications = "/applications",
  Profile = "/profile",
  Tokens = "/tokens",
  Settings = "/settings",
  ApplicationById = "/applications/:id",
  Home = "/",
  NotFound = "*",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
}

export const routeTitles = {
  [routes.APPLY_NOW]: "Apply For Job",
  [routes.Applications]: "Applications",
  [routes.Profile]: "Profile",
  [routes.Tokens]: "Tokens",
  [routes.Settings]: "Settings",
};
