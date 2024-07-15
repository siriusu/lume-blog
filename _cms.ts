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

export default cms;
