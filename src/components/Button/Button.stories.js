import Button from "./Button";

export default {
  title: "Shared/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args} />;

export const General = Template.bind({});
General.args = {
  label: "Submit",
};

export const Outlined = Template.bind({});
Outlined.args = {
  label: "Outlined",
  variant: "outline-secondary",
};

export const Block = Template.bind({});
Block.args = {
  label: "Block",
  block: true,
};
