import ProgressRing from "./ProgressRing";

export default {
  title: "Shared/ProgressRing",
  component: ProgressRing,
  argTypes: {},
};

const Template = (args) => <ProgressRing {...args} />;

export const General = Template.bind({});
General.args = {
  progress: 69,
  size: 200,
  strokeWidth: 10,
  circleOneStroke: "#7ea9e1",
  circleTwoStroke: "#4d3435",
};
