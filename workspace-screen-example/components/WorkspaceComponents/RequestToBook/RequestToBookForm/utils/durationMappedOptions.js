import { DurationTypeLabel, DurationType } from "../RequestToBookModel";

export const durationMappedOptions = Object.keys(DurationType).map((key) => ({
	value: DurationType[key],
	label: DurationTypeLabel[DurationType[key]]
}));
