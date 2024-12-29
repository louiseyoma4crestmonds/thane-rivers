import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import SERVER_URL from "src/services/server";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 24 * 60 * 60, // 2 days
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        console.log(req);
        const result = (await axios
          .post(`${SERVER_URL}/user-account/sign-in`, credentials)
          .then((response) => {
            const tokenData = {
              userToken: response.data.data[0].token,
              email: response.data.data[0].user.email,
              firstName: response.data.data[0].user.first_name,
              lastName: response.data.data[0].user.last_name,
            };

            return { tokenData };
          })
          .catch((error) => {
            throw new Error(error.response.data.message);
          })) || { networkError: "Network Issues" };
        return { id: "result", token: result };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user; // eslint-disable-line no-param-reassign
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token; // eslint-disable-line no-param-reassign
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signOut: "/",
  },
};

export default NextAuth(authOptions);
