import { Aisle } from '@db/models/aisle';

export const aisleCache = () => {
	const findAll = async () => {
		let aisles: Aisle[] = [];
		try {
			aisles = await Aisle.findAll();
		} catch (error) {
			console.error(error);
		}
		return aisles;
	};

	return { findAll };
};
