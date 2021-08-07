import Header from "./Header"

export default {
	title: "Shared/Header",
	component: Header,
	argTypes: {},
}

const Template = (args) => <Header {...args} />

export const General = Template.bind({})
General.args = {
	label: "Submit",
}
