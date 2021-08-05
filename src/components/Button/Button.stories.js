import Button from "./Button";

export default {
  title: "Shared/Button",
  component: Button,
  argTypes: {},
};

const Template = (args) => <Button {...args} />;

export const General = Template.bind({});
General.args = {
  label: "Button",
};
