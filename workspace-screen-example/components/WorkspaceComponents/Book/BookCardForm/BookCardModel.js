import { ModelValidator } from "react-formawesome-core";
import * as ClassValidator from "react-formawesome-core/class-validator";

import { isCardExpiry } from "../../../../customValidators/IsCardExpiry";

class BookCardModel {
	@ClassValidator.IsDefined({
		groups: ["number"],
		message: "Card number is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["number"],
		message: "Card number is required"
	})
	@ClassValidator.Matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, {
		groups: ["number"],
		message: "Card number should be XXXX XXXX XXXX XXXX"
	})
	number = undefined;

	@ClassValidator.IsDefined({
		groups: ["name"],
		message: "Cardholder name is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["name"],
		message: "Cardholder name is required"
	})
	name = undefined;

	@ClassValidator.IsDefined({
		groups: ["expiry"],
		message: "Expiry is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["expiry"],
		message: "Expiry is required"
	})
	@isCardExpiry({
		groups: ["expiry"],
		message: "Expiry should be MM/YY"
	})
	expiry = undefined;

	@ClassValidator.IsDefined({
		groups: ["cvc"],
		message: "CVC is required"
	})
	@ClassValidator.IsNotEmpty({
		groups: ["cvc"],
		message: "CVC is required"
	})
	@ClassValidator.Matches(/^\d{3}$/, {
		groups: ["cvc"],
		message: "CVC should be XXX"
	})
	cvc = undefined;
}

export const validator = new ModelValidator(BookCardModel);
