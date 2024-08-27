import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import images from "@/constant/data-image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { EyeIcon } from "lucide-react";

const ModalSignIn = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      router.push(`/`);
    }
  }, [session, status, router]);

  const handleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.ok) {
        // Sign-in was successful; handle additional logic if needed
      } else {
        console.error("Sign-in failed");
      }
    } catch (error) {
      console.error("An error occurred during sign-in:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-xs px-4 py-2 bg-neutral-800 rounded-md text-white"><p>Login</p></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome black</DialogTitle>
          <DialogDescription className="text-xs">
            <p className="mt-4">let&apos;s explore the shoop again with us</p>
          </DialogDescription>
        </DialogHeader>
        <div className="p-4 w-full bg-gray-100 rounded-lg">
          <div className="space-y-2 mb-4">
            <label className="text-sm text-neutral-800">Username</label>
            <input
              className="w-full h-10 text-xs px-4 rounded-md shadow-sm"
              placeholder="Enter username or email"
            />
          </div>
          <div className="space-y-2 mb-2">
            <label className="text-sm text-neutral-800">Password</label>
            <div className="w-full relative flex ">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-10 text-xs px-4 rounded-md shadow-sm"
                placeholder="Enter Password"
              />
              <EyeIcon onClick={handleToggleShowPassword} className="absolute right-4 top-2 "/>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <input type="checkbox" className="mr-2" id="remember" />
              <label className="text-xs text-neutral-800" htmlFor="remember">
                Remember me
              </label>
            </div>
            <a className="text-xs text-blue-500">Forget Password?</a>
          </div>
          <button className="w-full px-4 text-sm h-10 bg-neutral-800 rounded-md text-white">
            Login
          </button>
          <div className="py-6">
            <p className="text-center text-xs text-gray-400">
              Or Continue with
            </p>
          </div>
          <button
            onClick={handleSignIn}
            className=" mb-4 w-full px-4 text-sm h-10 border border-neutral-800 bg-white text-neutral-800 rounded-md  flex items-center justify-center gap-2"
          >
            <Image src={images.IconGoogle} width={16} alt="google" />
            Google
          </button>
          <p className="text-xs text-neutral-800 text-center">
            you don&apos;t have an account?
            <span>
              <a href="/sign-up" className="text-blue-500 font-medium">
                Register
              </a>
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSignIn;
