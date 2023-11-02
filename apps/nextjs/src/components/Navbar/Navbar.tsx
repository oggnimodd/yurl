import { FC } from "react";
import { Button } from "@nextui-org/react";
import { Brand, Container } from "@/ui";
import Link from "next/link";
import { User2 as LoginIcon } from "lucide-react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { AuthenticatedUserNavigation } from "@/components";

const Navbar: FC = () => {
  const { isLoaded, user } = useUser();

  return (
    <Container className="flex items-center py-5 justify-between">
      <Link href="/">
        <Brand title="yurl" />
      </Link>

      {isLoaded && !user && (
        <SignInButton>
          <Button color="primary" startContent={<LoginIcon size={16} />}>
            Login
          </Button>
        </SignInButton>
      )}

      <AuthenticatedUserNavigation />
    </Container>
  );
};

export default Navbar;
