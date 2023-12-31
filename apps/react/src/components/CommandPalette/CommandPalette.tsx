import { CSSProperties, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { rem } from "@mantine/core";
import { Spotlight, SpotlightActionData } from "@mantine/spotlight";
import {
  IconHome,
  IconDashboard,
  IconSearch,
  IconBrandGithub,
  IconPlus,
  IconBrandVue,
} from "@tabler/icons-react";
import { openLinkInNewTab } from "utils/navigation";
import { REPO_URL, VUE_VERSION_URL } from "constants/meta";

const commandPaletteIconBaseProps: {
  style: CSSProperties;
  stroke: string | number;
} = {
  style: {
    width: rem(24),
    height: rem(24),
  },
  stroke: 1.5,
};

const CommandPalette = () => {
  const navigate = useNavigate();

  const actions: SpotlightActionData[] = useMemo(() => {
    return [
      {
        id: "create",
        label: "Create new link",
        description: "Add a new shortened link",
        onClick: () => navigate("/new"),
        leftSection: <IconPlus {...commandPaletteIconBaseProps} />,
      },
      {
        id: "home",
        label: "Home",
        description: "Get to home page",
        onClick: () => navigate("/"),
        leftSection: <IconHome {...commandPaletteIconBaseProps} />,
      },
      {
        id: "dashboard",
        label: "Dashboard",
        description: "Get full information about current system status",
        onClick: () => navigate("/dashboard"),
        leftSection: <IconDashboard {...commandPaletteIconBaseProps} />,
      },
      {
        id: "source-code",
        label: "Source Code",
        description: "See source code",
        onClick: () => openLinkInNewTab(REPO_URL),
        leftSection: <IconBrandGithub {...commandPaletteIconBaseProps} />,
      },
      {
        id: "vue-version",
        label: "Vue Version",
        description: "See Vue version",
        onClick: () => openLinkInNewTab(VUE_VERSION_URL),
        leftSection: <IconBrandVue {...commandPaletteIconBaseProps} />,
      },
    ];
  }, []);

  return (
    <>
      <Spotlight
        actions={actions}
        nothingFound="Nothing found..."
        highlightQuery
        searchProps={{
          leftSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={1.5}
            />
          ),
          placeholder: "Search...",
        }}
      />
    </>
  );
};

export default CommandPalette;
