import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: `${process.env.VERCEL_URL}/pages/login`,
  },
});

export const config = { 
  matcher: [
    `/pages/create`,
  ]
};
