import { Address } from '../db/models/address';

export const addressCache = () => {
	const findAll = async () => {
		let addresses: Address[] = [];
		try {
			addresses = await Address.findAll();
		} catch (error) {
			console.error(error);
		}
		return addresses;
	};

	return { findAll };
};
