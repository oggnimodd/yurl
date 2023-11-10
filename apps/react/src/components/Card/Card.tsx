import { useDisclosure, useClipboard, useToggle } from "@mantine/hooks";
import { Modal, Paper, Text, ActionIcon, Menu, Button } from "@mantine/core";
import {
  IconCopy,
  IconEdit,
  IconTrash,
  IconAdjustmentsHorizontal,
  IconQrcode,
} from "@tabler/icons-react";
import { FC } from "react";
import { QRCodeSVG } from "qrcode.react";
import { notifications } from "@mantine/notifications";
import { DeleteLinkForm, EditLinkForm } from "components";

export interface CardProps {
  id: string;
  url: string;
  slug: string;
  description?: string;
}

const MENU_ICON_SIZE = 18;

const Card: FC<CardProps> = ({ id, url, slug, description = "" }) => {
  const [isEditOpen, handleEditModal] = useDisclosure(false);
  const [isDeleteOpen, handleDeleteModal] = useDisclosure(false);
  const [isQRCodeOpen, handleQRCodeModal] = useDisclosure(false);
  const clipboard = useClipboard();
  const [menuOpened, toggleMenu] = useToggle([false, true] as const);

  const targetUrl = `https://${window.location.host}/s/${slug}`;

  const copyUrl = () => {
    clipboard.copy(targetUrl);
    notifications.show({
      title: "Success",
      message: "URL copied to clipboard",
      color: "green",
    });
  };

  return (
    <Paper
      p="md"
      shadow="xs"
      className="flex justify-between rounded-lg border border-gray-8 p-4 transition-all hover:shadow-lg"
    >
      <div className="flex flex-col w-2/3">
        <div className="flex items-center gap-x-3 mb-2 items-center">
          <a
            className="text-lg font-semibold text-black dark:text-gray-1 transition-all hover:text-blue-6 no-underline"
            target="_blank"
            rel="noreferrer"
            href={targetUrl}
          >
            /s/{slug}
          </a>
          <div className="flex items-center gap-x-1">
            <ActionIcon size="sm" variant="transparent" onClick={copyUrl}>
              <IconCopy />
            </ActionIcon>
            <ActionIcon
              size="sm"
              variant="transparent"
              onClick={handleQRCodeModal.open}
            >
              <IconQrcode />
            </ActionIcon>
          </div>
        </div>
        <Text className="text-gray-8 dark:text-gray-5 mb-1 truncate">
          {url}
        </Text>
        <Text className="text-gray-7 dark:text-gray-6 text-sm truncate">
          {description}
        </Text>
      </div>
      <div className="flex flex-col max-w-1/3">
        <Menu opened={menuOpened} onChange={toggleMenu}>
          <Menu.Target>
            <Button
              color="blue"
              size="xs"
              variant="outline"
              leftSection={<IconAdjustmentsHorizontal size={16} />}
              onClick={() => toggleMenu()}
            >
              Options
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconCopy size={MENU_ICON_SIZE} />}
              onClick={copyUrl}
            >
              Copy
            </Menu.Item>
            <Menu.Item
              leftSection={<IconEdit size={MENU_ICON_SIZE} />}
              onClick={handleEditModal.open}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={MENU_ICON_SIZE} />}
              onClick={handleDeleteModal.open}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Modal
          centered
          opened={isEditOpen}
          onClose={handleEditModal.close}
          title={`Edit: /s/${slug}`}
        >
          <EditLinkForm linkId={id} url={url} description={description} />
        </Modal>
        <Modal
          centered
          opened={isDeleteOpen}
          onClose={handleDeleteModal.close}
          title={`Delete: /s/${slug}`}
        >
          <DeleteLinkForm linkId={id} />
        </Modal>

        <Modal
          opened={isQRCodeOpen}
          onClose={handleQRCodeModal.close}
          title={`QR Code for: ${slug}`}
          centered
        >
          <div className="flex flex-col items-center">
            <div className="w-10/12 xs:w-64">
              <QRCodeSVG className="!w-full !h-full" value={targetUrl} />
            </div>
            <Text className="text-center mt-5 text-sm">
              Scan the QR code above to quickly access your URL on a mobile
              device.
            </Text>
          </div>
        </Modal>
      </div>
    </Paper>
  );
};

export default Card;
