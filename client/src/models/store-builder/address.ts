export interface Address {
	addressLineOne: string;
	addressLineTwo?: string;
	city: string;
	state: string;
	zip: number;
	updateby?: string;
}

export const initAddressForSubmission = (
	lineOne: string,
	city: string,
	state: string,
	zip: number,
	lineTwo?: string,
	updateby?: string
): Address => {
	const address = {} as Address;

	address.addressLineOne = lineOne;
	address.addressLineTwo = lineTwo ?? '';
	address.city = city;
	address.state = state;
	address.zip = zip;
	address.updateby = updateby ?? '';

	return address;
};

export const initBlankAddress = (): Address => {
	const state = {} as Address;

	state.addressLineOne = '';
	state.city = '';
	state.state = '';
	state.zip = -1;

	return state;
};
