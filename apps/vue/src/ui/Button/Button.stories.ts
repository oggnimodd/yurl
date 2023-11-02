import type { Meta, StoryObj } from "@storybook/vue3";

import Button from "./Button.vue";

const meta = {
  title: "Example/Button",
  component: Button,
  // tags: ["autodocs"],
  argTypes: {
    disabled: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled",
    disabled: true,
  },
};
