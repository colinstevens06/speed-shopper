import { useVerifyCache } from '@cache/init-verify-cache';
import { Address } from '../db/models/address';
import NodeCache from 'node-cache';
import { CacheKeys } from '@models/cache';

export const useAddressController = (cache: NodeCache) => {
	const { clearCacheKey, verifyCacheInController } = useVerifyCache(cache);

	const createAddress = async (address: Address) => {
		let newAddress = new Address();
		try {
			newAddress = await Address.create({
				addressLineOne: address.addressLineOne,
				city: address.city,
				state: address.state,
				zip: address.zip,
				updateby: 'admin'
			});
			// Clear the cache for this so new data is fetched next time
			await clearCacheKey(CacheKeys.AllAddresses);
		} catch (error) {
			console.error(error);
		}

		return newAddress;
	};

	const findAddress = async (id: number) => {
		const addresses = (await verifyCacheInController(CacheKeys.AllAddresses, findManyAddresses)) as Address[];
		const address = addresses.find(addr => addr.addressId === id);
		return address;
	};

	const findAddressByAddressCityState = async (address: Address): Promise<Address | null> => {
		let searchResult: Address | null = null;
		try {
			console.log(
				`\n****** Attempting findAddressByAddressCityState for ${address.addressLineOne} ${address.city} ${address.state}`
			);
			searchResult = await Address.findOne({
				where: {
					addressLineOne: address.addressLineOne,
					city: address.city,
					state: address.state
				}
			});
		} catch (error) {
			console.error(error);
		}

		return searchResult;
	};

	/**
	 * GET all addresses
	 */
	const findManyAddresses = async () => {
		let addresses: Address[] = [];
		try {
			addresses = await Address.findAll();
		} catch (error) {
			console.error(error);
		}
		return addresses;
	};

	const updateAddress = async (id: number, address: Address) => {
		// let addressUpdate: Address | null = null;
		let addressUpdate = await findAddress(id);

		try {
			await addressUpdate?.set({
				...address
			});
			const savedUpdate = await addressUpdate?.save();
			// Update the cache with the updated address
			if (savedUpdate) {
				// cache.updateAddress(savedUpdate);
				await clearCacheKey(CacheKeys.AllAddresses);
				addressUpdate = savedUpdate;
			}
		} catch (error) {
			console.error(error);
		}

		return addressUpdate;
	};

	return { createAddress, findAddress, findAddressByAddressCityState, findManyAddresses, updateAddress };
};
