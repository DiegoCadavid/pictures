import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const useProtectedView = () => {
  const { status, data: session} = useSession();

  useEffect(() => {
    const main = async () => {
      if(status == "unauthenticated") {
        await signIn();
      }
    }
    
    void main();
  }, [status])

  return {
    status, 
    session
  };
}

export default useProtectedView;