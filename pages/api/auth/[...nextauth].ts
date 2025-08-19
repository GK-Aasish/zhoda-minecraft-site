import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user?.email === "gk.aasishkarki@gmail.com") {
        (session.user as any).role = "superadmin";
      } else {
        (session.user as any).role = "user";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
