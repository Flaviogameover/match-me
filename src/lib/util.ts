import {differenceInYears} from "date-fns";

export const calculateAge = (dob: Date) => {
	return differenceInYears(new Date(), dob);
};