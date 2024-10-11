import { $ } from "./../utils";
import { signIn } from "auth-astro/client";
const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
    </svg>
  );
};
export const SigninBtn = () => {
  const handleSignIn = (): void => {
    if (typeof window !== "undefined") {
      const $butonGoogle: Element | null = $("button[value='google']");
      $butonGoogle?.addEventListener("click", (): void => {
        signIn("google", {
          redirectTo: "/",
        });
      });
    }
  };
  return (
    <button
      value="google"
      onClick={handleSignIn}
      name="provider"
      type="submit"
      className=" signin flex text-pretty flex-row gap-1 p-1 bg-[#ff101f] rounded-md items-center transition-all duration-300 ease-in-out hover:bg-[#ff1068] hover:scale-[1.02] hover:opacity-100"
    >
      <GoogleIcon />
      <span className="font-semibold text-sm text-balance opacity-75">
        Inicia sesión con Google
      </span>
    </button>
  );
};
