export const clerkConfig = {
  signInUrl: "/sign-in",

  signUpUrl: "/sign-up",

  afterSignInUrl: "/dashboard",

  afterSignUpUrl: "/dashboard",

  appearance: {
    variables: {
      colorPrimary: "#16A34A",
    },
  },

  socialConnections: [
    "google",
    "github",
  ],

  signIn: {
    strategy: "email_code",
  },
};