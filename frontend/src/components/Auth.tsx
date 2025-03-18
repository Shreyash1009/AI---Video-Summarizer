import { useEffect, useState } from "react";
import { useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const { signOut, user } = useClerk();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
    <div className="absolute top-4 right-4">
      {isLoggedIn ? (
        <Button onClick={() => signOut()}>Sign Out</Button>
      ) : (
        <Button onClick={() => window.location.href = "/sign-in"}>Sign In</Button>
      )}
    </div>
  );
}
