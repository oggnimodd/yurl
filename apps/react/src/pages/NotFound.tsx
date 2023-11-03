import { CommonLayout } from "layouts";
import { Text, Button } from "@mantine/core";
import { IconAlertTriangle, IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <CommonLayout>
      <div className="flex flex-col items-center py-5 gap-y-3">
        <IconAlertTriangle className="text-blue-6" stroke={1.6} size={60} />
        <Text className="text-center text-2xl font-bold text-blue-6">
          Oops page not found
        </Text>
        <Button
          leftSection={<IconArrowLeft size={20} stroke={2.5} />}
          size="sm"
          component={Link}
          to="/"
        >
          Back to Home
        </Button>
      </div>
    </CommonLayout>
  );
};

export default NotFound;
