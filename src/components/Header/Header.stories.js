import Header from "./Header";

export default {
  title: "Shared/Header",
  component: Header,
  argTypes: {},
};

const Template = (args) => <Header {...args} />;

export const General = Template.bind({});
General.args = {
  src: "https://b2b.talkspace.com/hs-fs/hubfs/TS_nav_logo-1.png?width=2540&name=TS_nav_logo-1.png",
  links: [
    { text: "Home", link: "" },
    { text: "Princing", link: "" },
  ],
};
