import { defineConfig } from "auth-astro";
import Google from "@auth/core/providers/google";
import { supabase } from "./src/lib/supabase";

export default defineConfig({
  providers: [
    Google({
      clientId: import.meta.env.GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const result = await supabase
        .from("profiles")
        .select("*")
        .eq("email", user.email);
      if (result.data && result.data.length > 0) {
        console.log(result.data);
        return true;
      }
      const { data, error } = await supabase.from("profiles").upsert({
        email: user.email,
        user_name: user.name,
        name: user.name,
        avatar_url: user.image,
      });
      if (error) {
        console.log(error);
        return false;
      }
      return true;
    },
  },
});
