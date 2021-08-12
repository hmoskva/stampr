import FileUpload from "./FIleUpload";

export default {
  title: "Shared/FileUpload",
  component: FileUpload,
  argTypes: {},
};

const Template = (args) => <FileUpload {...args} />;

export const General = Template.bind({});
General.args = {
  label: "Drag & Drop files here to upload",
  sublabel: "Browse Files",
};
