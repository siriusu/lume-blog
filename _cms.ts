import "https://deno.land/std@0.191.0/dotenv/load.ts";
import lumeCMS from "lume/cms/mod.ts";

const passwd = Deno.env.get("BASIC_PASSWD") || "";

const cms = lumeCMS({
	auth: {
		method: "basic",
		users: {
			siriusu: passwd,
		},
	},
	log: {
		filename: "cms_errors.log",
	},
});

cms.document("toppage", "src:index.md", [
	"title: text",
	"description: textarea",
	"content: markdown",
]);
cms.collection({
	name: "posts",
	description: "To create, edit or delete the posts of the blog",
	store: "src:posts/*.md",
	fields: [
		{
			name: "title",
			type: "text",
			label: "Title of the content",
			description: "It will be visible in the browser tab",
			attributes: {
				required: true,
				maxlength: 100,
			},
		},
		{
			name: "published",
			type: "date",
			label: "Published date",
			value: new Date(),
			description: "Set a future date if you want to publish it later",
			attributes: {
				placeholder: "For example: 2024-01-01",
			},
		},
		{
			name: "tags",
			type: "list",
			label: "tags for content",
			init(field) {
				const { data } = field.cmsContent;
				field.options = data.site?.search.values("tags");
			},
			description: "Set a tags for Categorize content",
		},
		{
			name: "content",
			type: "markdown",
			label: "Page content",
			value: "Write **markdown** code here",
			description: `<a target="_blank" href="https://www.markdownguide.org">More info about markdown syntax</a>`,
		},
	],
	nameField: "title",
});

export default cms;
