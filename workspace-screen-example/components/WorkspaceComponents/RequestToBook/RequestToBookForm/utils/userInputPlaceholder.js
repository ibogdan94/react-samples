import { TenantType } from "../RequestToBookModel";

export function userInputPlaceholder(tenantType) {
	switch (tenantType) {
		case TenantType.company: {
			return {
				name: "Company name",
				email: "Email",
				phone: "Phone number",
				information: "Write a bit about your company..."
			};
		}
		case TenantType.freelancer: {
			return {
				name: "Your name",
				email: "Email",
				phone: "Phone number",
				information: "Write a bit about what you do..."
			};
		}
		default: {
			return {
				name: "Name",
				email: "Email",
				phone: "Phone",
				information: "Information"
			};
		}
	}
}
