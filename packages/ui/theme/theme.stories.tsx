import {
  Accordion,
  AccordionItem,
  Button,
  Checkbox,
  Chip,
  Code,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Modal,
  Pagination,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Kbd,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Select,
  SelectItem,
  Tabs,
  Tab,
  Input,
} from "@nextui-org/react";
import React from "react";

export const ButtonExamples = () => {
  return (
    <div className="flex flex-wrap flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <Button color="primary" variant="bordered">
          Bordered
        </Button>
        <Button color="primary" variant="faded">
          Faded
        </Button>
        <Button color="primary" variant="flat">
          Flat
        </Button>
        <Button color="primary" variant="ghost">
          Ghost
        </Button>
        <Button color="primary" variant="light">
          Light
        </Button>
        <Button color="primary" variant="shadow">
          Shadow
        </Button>
        <Button color="primary" variant="solid">
          Solid
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="default">Default</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="danger">Danger</Button>
      </div>
    </div>
  );
};

export const AccordionExamples = () => {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="flex flex-col gap-4">
      <Accordion>
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      <Accordion variant="shadow">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      <Accordion variant="bordered">
        <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
          {defaultContent}
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
          {defaultContent}
        </AccordionItem>
      </Accordion>

      <Accordion selectionMode="multiple">
        <AccordionItem
          key="1"
          aria-label="Chung Miller"
          startContent={
            <Avatar
              isBordered
              color="primary"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          }
          subtitle="4 unread messages"
          title="Chung Miller"
        >
          {defaultContent}
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Janelle Lenard"
          startContent={
            <Avatar
              isBordered
              color="success"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          }
          subtitle="3 incompleted steps"
          title="Janelle Lenard"
        >
          {defaultContent}
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Zoey Lang"
          startContent={
            <Avatar
              isBordered
              color="warning"
              radius="lg"
              src="https://i.pravatar.cc/150?u=a04258114e29026702d"
            />
          }
          subtitle={
            <p className="flex">
              2 issues to<p className="text-primary ml-1">fix now</p>
            </p>
          }
          title="Zoey Lang"
        >
          {defaultContent}
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const ChipExamples = () => {
  return (
    <div className="flex gap-4 flex-col">
      <div className="flex gap-4 flex-wrap">
        <Chip color="default">Default</Chip>
        <Chip color="primary">Primary</Chip>
        <Chip color="secondary">Secondary</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="danger">Danger</Chip>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Chip radius="full">Full</Chip>
        <Chip radius="lg">Large</Chip>
        <Chip radius="md">Medium</Chip>
        <Chip radius="sm">Small</Chip>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Chip color="warning" variant="solid">
          Solid
        </Chip>
        <Chip color="warning" variant="bordered">
          Bordered
        </Chip>
        <Chip color="warning" variant="light">
          Light
        </Chip>
        <Chip color="warning" variant="flat">
          Flat
        </Chip>
        <Chip color="warning" variant="faded">
          Faded
        </Chip>
        <Chip color="warning" variant="shadow">
          Shadow
        </Chip>
        <Chip color="warning" variant="dot">
          Dot
        </Chip>
      </div>
    </div>
  );
};

export const CodeExamples = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Code color="default">npm install @nextui-org/react</Code>
      <Code color="primary">npm install @nextui-org/react</Code>
      <Code color="secondary">npm install @nextui-org/react</Code>
      <Code color="success">npm install @nextui-org/react</Code>
      <Code color="warning">npm install @nextui-org/react</Code>
      <Code color="danger">npm install @nextui-org/react</Code>
    </div>
  );
};

export const ModalExamples = () => {
  type Size = React.ComponentProps<typeof Modal>["size"];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState<Size>("md");

  const sizes: Size[] = [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
    "full",
  ];

  const handleOpen = (size: Size) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {sizes.map((size) => (
          <Button key={size} onPress={() => handleOpen(size)}>
            Open {size}
          </Button>
        ))}
      </div>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export const PaginationExamples = () => {
  const colors: React.ComponentProps<typeof Pagination>["color"][] = [
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];

  return (
    <div className="flex flex-col gap-4">
      <Pagination total={10} initialPage={1} />
      <div className="flex flex-wrap gap-4 items-center">
        {colors.map((color) => (
          <Pagination key={color} total={10} initialPage={1} color={color} />
        ))}
      </div>
    </div>
  );
};

export const PopoverExamples = () => {
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <Button>Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">Popover Content</div>
          <div className="text-tiny">This is the popover content</div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const KbdExamples = () => {
  return (
    <div className="flex gap-4">
      <div className="flex gap-4">
        <Kbd keys={["command"]}>K</Kbd>
        <Kbd keys={["command", "shift"]}>N</Kbd>
        <Kbd keys={["option", "command"]}>P</Kbd>
      </div>
    </div>
  );
};

export const DropdownExamples = () => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
            description="@tonyreichert"
            name="Tony Reichert"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">@tonyreichert</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export const CheckboxExamples = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">
        <Checkbox defaultSelected size="sm">
          Small
        </Checkbox>
        <Checkbox defaultSelected size="md">
          Medium
        </Checkbox>
        <Checkbox defaultSelected size="lg">
          Large
        </Checkbox>
      </div>
      <div className="flex gap-4 flex-wrap">
        <Checkbox defaultSelected color="default">
          Default
        </Checkbox>
        <Checkbox defaultSelected color="primary">
          Primary
        </Checkbox>
        <Checkbox defaultSelected color="secondary">
          Secondary
        </Checkbox>
        <Checkbox defaultSelected color="success">
          Success
        </Checkbox>
        <Checkbox defaultSelected color="warning">
          Warning
        </Checkbox>
        <Checkbox defaultSelected color="danger">
          Danger
        </Checkbox>
      </div>
    </div>
  );
};

export const SpinnerExamples = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Spinner color="default" />
        <Spinner color="primary" />
        <Spinner color="secondary" />
        <Spinner color="success" />
        <Spinner color="warning" />
        <Spinner color="danger" />
      </div>
      <div className="flex gap-4">
        <Spinner label="Default" color="default" labelColor="foreground" />
        <Spinner label="Primary" color="primary" labelColor="primary" />
        <Spinner label="Secondary" color="secondary" labelColor="secondary" />
        <Spinner label="Success" color="success" labelColor="success" />
        <Spinner label="Warning" color="warning" labelColor="warning" />
        <Spinner label="Danger" color="danger" labelColor="danger" />
      </div>
    </div>
  );
};

export const CardExamples = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image
          classNames={{
            wrapper: "border-1 rounded-full overflow-hidden",
          }}
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
      <Divider />
      <CardFooter className="flex justify-between">
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
        >
          Visit source code on GitHub.
        </Link>
        <Button color="primary">Hello</Button>
      </CardFooter>
    </Card>
  );
};

export const DefaultColors = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-content1 p-24">
        <p className="text-content1-foreground">Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="bg-content2 p-24">
        <p className="text-content2-foreground">Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="bg-content3 p-24">
        <p className="text-content3-foreground">Lorem ipsum dolor sit amet.</p>
      </div>

      <div className="bg-content4 p-24">
        <p className="text-content4-foreground">Lorem ipsum dolor sit amet.</p>
      </div>
    </div>
  );
};

export const SelectExamples = () => {
  const animals = [
    {
      label: "Cat",
      value: "cat",
      description: "The second most popular pet in the world",
    },
    {
      label: "Dog",
      value: "dog",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      value: "elephant",
      description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
    { label: "Tiger", value: "tiger", description: "The largest cat species" },
    {
      label: "Giraffe",
      value: "giraffe",
      description: "The tallest land animal",
    },
    {
      label: "Dolphin",
      value: "dolphin",
      description: "A widely distributed and diverse group of aquatic mammals",
    },
    {
      label: "Penguin",
      value: "penguin",
      description: "A group of aquatic flightless birds",
    },
    {
      label: "Zebra",
      value: "zebra",
      description: "A several species of African equids",
    },
    {
      label: "Shark",
      value: "shark",
      description:
        "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
      label: "Whale",
      value: "whale",
      description: "Diverse group of fully aquatic placental marine mammals",
    },
    {
      label: "Otter",
      value: "otter",
      description: "A carnivorous mammal in the subfamily Lutrinae",
    },
    {
      label: "Crocodile",
      value: "crocodile",
      description: "A large semiaquatic reptile",
    },
  ];

  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select label="Select an animal" className="max-w-xs">
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export const TabsExamples = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="photos" title="Photos">
          <Card>
            <CardBody>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="music" title="Music">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="videos" title="Videos">
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export const InputExamples = () => {
  const colors: React.ComponentProps<typeof Input>["color"][] = [
    "default",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];

  const variants: React.ComponentProps<typeof Input>["variant"][] = [
    "flat",
    "bordered",
    "underlined",
    "faded",
  ];

  const placements: React.ComponentProps<typeof Input>["labelPlacement"][] = [
    "inside",
    "outside",
    "outside-left",
  ];

  return (
    <div className="flex flex-col gap-20">
      <div className="w-full flex flex-col gap-4">
        {variants.map((variant) => (
          <div
            key={variant}
            className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
          >
            <Input type="email" variant={variant} label="Email" />
            <Input
              type="email"
              variant={variant}
              label="Email"
              placeholder="Enter your email"
            />
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row flex-wrap gap-4">
        {colors.map((color) => (
          <Input
            key={color}
            type="email"
            color={color}
            label="Email"
            placeholder="Enter your email"
            defaultValue="junior@nextui.org"
            className="max-w-[220px]"
          />
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-default-500 text-small">Without placeholder</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            {placements.map((placement) => (
              <Input
                key={placement}
                type="email"
                label="Email"
                labelPlacement={placement}
                description={placement}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-default-500 text-small">With placeholder</h3>
          <div className="flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4">
            {placements.map((placement) => (
              <Input
                key={placement}
                type="email"
                label="Email"
                labelPlacement={placement}
                placeholder="Enter your email"
                description={placement}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
