import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: `${process.env.VERCEL_URL}/pages/login`,
  },
});

export const config = { 
  matcher: [
    `${process.env.VERCEL_URL}/pages/create`,
    `${process.env.VERCEL_URL}/pages/myprofile`
  ]
};
