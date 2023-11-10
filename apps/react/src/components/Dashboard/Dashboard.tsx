import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  TextInput,
  Alert,
  Loader as MantineLoader,
  Button,
} from "@mantine/core";
import { api } from "trpc";
import { Link } from "react-router-dom";
import { Card } from "components";
import { IconRocket, IconSearch } from "@tabler/icons-react";
import { useDebouncedState } from "@mantine/hooks";
import Fuse from "fuse.js";

const Loader = () => {
  return (
    <div className="flex flex-col items-center py-5">
      <MantineLoader color="blue" />
      <p>Loading...</p>
    </div>
  );
};

const ErrorMessage = ({ message = "Something went wrong" }) => {
  return (
    <Alert>
      <p className="text-center">{message}</p>
    </Alert>
  );
};

type FilterLinkInput = {
  filter: string;
};

const options = {
  keys: ["slug", "url"],
  includeScore: true,
};

const Dashboard = () => {
  const [, startTransition] = useTransition();
  const { register } = useForm<FilterLinkInput>();
  const [filter] = useState("");
  const [searchLinks, setSearchLinks] = useDebouncedState("", 200);

  const {
    data: linksData,
    isLoading,
    error,
  } = api.link.allLinks.useQuery({
    filter,
  });

  if (error) return <ErrorMessage message={error.message} />;

  if (isLoading) {
    return <Loader />;
  }

  if (linksData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <IconRocket className="mb-1 text-blue-6" size={64} stroke={1.3} />
        <p className="mb-4 text-lg">Lets create your first link!</p>
        <Link to="/new" className="border border-gray-4">
          <Button size="xs" variant="outline">
            Create a link
          </Button>
        </Link>
      </div>
    );
  }

  const fuse = new Fuse(linksData, options);
  const result = fuse.search(searchLinks);
  const filteredLinks = result.map(({ item }) => item);

  return (
    <div>
      <div className="my-6">
        <div className="w-full">
          <TextInput
            leftSection={<IconSearch size={16} />}
            id="filter"
            type="text"
            placeholder="Search links"
            {...register("filter")}
            onChange={(e) => {
              startTransition(() => {
                setSearchLinks(e.target.value);
              });
            }}
          />
        </div>
      </div>

      {searchLinks && filteredLinks.length === 0 ? (
        <p>
          No links found for <span className="font-bold">"{searchLinks}"</span>
        </p>
      ) : (
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(searchLinks ? filteredLinks : linksData).map((link) => (
            <Card
              key={link.id}
              id={link.id}
              url={link.url}
              description={link.description || ""}
              slug={link.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
