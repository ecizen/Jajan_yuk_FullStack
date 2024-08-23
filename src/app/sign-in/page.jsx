'use client'
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const SignInButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.id) {
      router.push(`/cart/${session.user.id}`);
    }
  }, [session, status, router]);

  const handleSignIn = async () => {
    try {
      const result = await signIn('google', { redirect: false });
      if (result?.ok) {
        // Sign-in was successful; handle additional logic if needed
      } else {
        console.error('Sign-in failed');
      }
    } catch (error) {
      console.error('An error occurred during sign-in:', error);
    }
  };

  return (
    <button onClick={handleSignIn} className="text-black text-2xl font-bold">
      Sign in with Google
    </button>
  );
};

export default SignInButton;
