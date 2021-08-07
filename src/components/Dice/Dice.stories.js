import Dice from "./Dice";

export default {
  title: "Shared/Dice",
  component: Dice,
  argTypes: {},
};

const Template = (args) => <Dice {...args} />;

export const General = Template.bind({});
General.args = {
  face: 4,
};
