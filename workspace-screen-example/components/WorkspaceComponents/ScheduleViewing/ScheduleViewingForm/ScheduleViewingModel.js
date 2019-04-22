import { ModelValidator } from "react-formawesome-core";
import * as ClassValidator from "react-formawesome-core/class-validator";

import { IsUKPhone } from "../../../../customValidators/IsUKPhone";

class ScheduleViewingModel {
    startTime = undefined;
    endTime = undefined;

    date = undefined;
    time = undefined;

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
}

export const validator = new ModelValidator(ScheduleViewingModel);
