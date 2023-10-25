import { FC } from "react";
import { Button, Skeleton } from "@nextui-org/react";
import { Brand, Container } from "@acme/ui";
import Link from "next/link";
import { User2 as LoginIcon } from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { UserAccountNavigation } from "components";

const Navbar: FC = () => {
  const { isLoaded, user } = useUser();

  return (
    <Container className="flex items-center py-5 justify-between">
      <Link href="/">
        <Brand title="Rebbit" />
      </Link>

      {!isLoaded && <Skeleton className="w-10 h-10 rounded-full" />}

      {isLoaded && !user && (
        <SignInButton>
          <Button color="primary" startContent={<LoginIcon size={16} />}>
            Login
          </Button>
        </SignInButton>
      )}

      {isLoaded && user && <UserAccountNavigation />}
    </Container>
  );
};

export default Navbar;
