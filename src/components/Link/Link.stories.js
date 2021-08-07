import Link from "./Link"

export default {
	title: "Shared/Link",
	component: Link,
	argTypes: {},
}

const Template = (args) => <Link {...args} />

export const General = Template.bind({})
General.args = {
	disabled: false,
	label: "General Link",
}

export const Disabled = Template.bind({})
Disabled.args = {
	disabled: true,
	label: "Disabled Link",
}
