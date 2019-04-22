import { ModelValidator } from "react-formawesome-core";
import * as ClassValidator from "react-formawesome-core/class-validator";

import { IsEmail } from "../../../../customValidators/IsEmail";
import { IsUKPhone } from "../../../../customValidators/IsUKPhone";

export const TenantType = {
	freelancer: "freelancer",
	company: "company"
};

export const TenantTypeLabel = {
	[TenantType.company]: "Company",
	[TenantType.freelancer]: "Freelancer"
};

export const DurationType = {
	not_sure: "not-sure",
	one_year_or_more: "one-year-or-more",
	one_month_or_more: "one-month-or-more",
	six_month_or_more: "six-month-or-more"
};

export const DurationTypeLabel = {
	[DurationType.not_sure]: "Not sure",
	[DurationType.one_year_or_more]: "One year or more",
	[DurationType.one_month_or_more]: "One month or more",
	[DurationType.six_month_or_more]: "Six month or more"
};

class RequestToBookModel {
	tenantType = undefined;
	startTime = undefined;
	duration = undefined;

	@IsUKPhone({
        groups: ["phone"],
        message: "Invalid phone number"
    })
	@ClassValidator.IsDefined({
		groups: ["phone"],
		message: "Phone is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["phone"],
		message: "Phone is required"
	})
	phone = undefined;

	@ClassValidator.IsDefined({
		groups: ["email"],
		message: "Email is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["email"],
		message: "Email is required"
	})
	@IsEmail({
		groups: ["email"],
		message: "Invalid email"
	})
	email = undefined;

	@ClassValidator.IsDefined({
		groups: ["name"],
		message: "Name is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["name"],
		message: "Name is required"
	})
	name = undefined;

	@ClassValidator.IsDefined({
		groups: ["information"],
		message: "Information is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["information"],
		message: "Information is required"
	})
	information = undefined;
}

export const validator = new ModelValidator(RequestToBookModel, {
	startTime: Date.now(),
	duration: DurationType.not_sure,
	tenantType: TenantType.freelancer
});
