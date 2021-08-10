import Link from "./Link";

export default {
  title: "Shared/Link",
  component: Link,
  argTypes: {},
};

const Template = (args) => <Link {...args} />;

export const General = Template.bind({});
General.args = {
  label: "Link",
  to: "www.google.com",
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...General.args,
  label: "Disabled Link",
  disabled: true,
};
