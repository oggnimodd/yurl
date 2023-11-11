import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { CommonLayout } from "./CommonLayout";
import { Title, Button } from "@mantine/core";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <CommonLayout>
      <div className="border-b-2 border-gray-8 mt-1">
        <div className="w-full flex items-center justify-between">
          <Title className="text-2xl" order={2}>
            Dashboard
          </Title>
          <Link to="/new">
            <Button size="sm" leftSection={<IconPlus size={18} />}>
              Create new link
            </Button>
          </Link>
        </div>
      </div>
      {children}
    </CommonLayout>
  );
};

export default DashboardLayout;
