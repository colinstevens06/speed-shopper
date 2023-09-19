export interface Address {
	addressLineOne: string;
	addressLineTwo?: string;
	city: string;
	state: string;
	zip: number;
	updateby?: string;
}

export const initAddress = (
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
