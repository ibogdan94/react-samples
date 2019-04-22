import { ModelValidator } from "react-formawesome-core";
import * as ClassValidator from "react-formawesome-core/class-validator";

import { IsEmail } from "../../../../customValidators/IsEmail";
import { IsUKPhone } from "../../../../customValidators/IsUKPhone";

class BookInfoModel {
	startTime = undefined;
	endTime = undefined;

	date = undefined;
	time = undefined;

	@IsUKPhone({
		groups: ["phone"]
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
		message: "invalid email"
	})
	email = undefined;

	@ClassValidator.IsDefined({
		groups: ["name"],
		message: "Meeting name is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["name"],
		message: "Meeting name is required"
	})
	name = undefined;
}

export const validator = new ModelValidator(BookInfoModel);
