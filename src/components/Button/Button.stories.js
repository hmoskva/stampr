import Button from "./Button"

export default {
	title: "Shared/Button",
	component: Button,
	argTypes: {},
}

const Template = (args) => <Button {...args} />

export const General = Template.bind({})
General.args = {
	label: "Submit",
}

export const Outlined = Template.bind({})
General.args = {
	label: "Submit",
	variant: "outlined-secondary",
}

export const Block = Template.bind({})
General.args = {
	label: "Block",
	block: true,
}
