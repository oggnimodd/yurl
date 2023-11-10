import { FC } from "react";
import { Title, Text, Button, Flex } from "@mantine/core";
import { IconLink, IconBrandGithub } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { REPO_URL } from "constants/meta";

const Hero: FC = () => {
  return (
    <Flex className="mt-36 xs:mt-20 items-center flex-col text-center">
      <Title
        order={1}
        className="text-3xl xs:text-4xl md:text-5xl text-blue-6 mb-3"
      >
        Super Cool Link Shortener
      </Title>
      <Text className="mb-5 text-xl xs:text-2xl dark:text-white text-gray-7">
        Unlimited links &amp; custom slugs
      </Text>
      <Flex className="flex-wrap gap-4 justify-center">
        <Button
          component={Link}
          to="/dashboard"
          size="sm"
          color="blue"
          leftSection={<IconLink />}
        >
          Get Started
        </Button>
        <Button
          rel="noreferrer"
          target="_blank"
          component="a"
          href={REPO_URL}
          size="sm"
          color="gray.8"
          leftSection={<IconBrandGithub />}
        >
          Source Code
        </Button>
      </Flex>
    </Flex>
  );
};

export default Hero;
