// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

export default NextAuth({
  providers: [
    Providers.Credentials({
      // The name to display on the sign-in form (e.g., 'Sign in with...')
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Make a request to your backend to validate the credentials and get a Bearer token
          const response = await axios.post(
            "https://task.amidin.site/auth/signin",
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          if (response.status === 200) {
            // If authentication succeeds, return user data and access token
            const user = response.data.user;
            const token = response.data.token;

            return Promise.resolve({ ...user, accessToken: token });
          } else {
            // If authentication fails, return null
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Error during authentication:", error);
          // Handle errors, e.g., return null on authentication failure
          return Promise.resolve(null);
        }
      },
    }),
  ],
  callbacks: {
    async jwt(token, user) {
      // If a user is authenticated, set the token in the JWT token
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
});
