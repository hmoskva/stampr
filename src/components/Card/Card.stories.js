import Card from "./Card";

export default {
  title: "Shared/Card",
  component: Card,
  argTypes: {
    backgroundColor: {
      control: {type: "color"},
    },
  },
};

const Template = (args) => (
  <div style={{width: 300, height: 300}}>
    <Card {...args} />
  </div>
);

export const General = Template.bind({});
General.args = {
  backgroundColor: "blue",
};
