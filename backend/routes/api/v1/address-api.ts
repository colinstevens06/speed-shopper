import NodeCache from 'node-cache';
import { useAddressController } from '@controllers/address-controller';
import { Express, Request, Response } from 'express';
import { useVerifyCache } from '@cache/init-verify-cache';
import { Address } from '@db/models/address';
import { ResultType, initPostResult } from '@models/dto';

export const useAddressApi = (app: Express, cache: NodeCache) => {
	const { createAddress, findAddress, findManyAddresses, updateAddress } = useAddressController(cache);

	const { verifyCacheInApi } = useVerifyCache(cache);

	const baseUrl = '/api/addresses';

	/**
	 * Get groceryStoreName by ID
	 * @returns null if not found
	 */
	const getAddress = () => {
		return app.get(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = req.params.id;
			try {
				const address = await findAddress(parseInt(id));
				if (address) {
					res.send(address);
				} else {
					res.send('Address not found');
				}
			} catch (error) {
				console.error(error);
				res.send('An unexpected error occurred');
			}
		});
	};

	/**
	 * GET all addresses
	 * @returns array addresses
	 */
	const getAllAddresses = () => {
		return app.get(`${baseUrl}`, verifyCacheInApi, async (req: Request, res: Response) => {
			let addresses: Address[] = [];
			try {
				addresses = await findManyAddresses();
				cache.set(req.url, addresses);
				res.send(addresses);
			} catch (error) {
				console.error(error);
			}
		});
	};

	/**
	 * Post will include a name
	 */
	const postAddress = () => {
		return app.post(`${baseUrl}`, async (req: Request, res: Response) => {
			const address = req.body.address;

			try {
				const postResult = initPostResult();
				const newAddress = await createAddress(address);

				if (newAddress) {
					postResult.resultType = ResultType.Success;
					postResult.value = newAddress;
				}

				res.send(postResult);
			} catch (error) {
				console.error(error);
			}
		});
	};

	const putAddress = () => {
		return app.put(`${baseUrl}/:id`, async (req: Request, res: Response) => {
			const id = parseInt(req.params.id);
			const address = req.body.address;

			try {
				const updatedAddress = await updateAddress(id, address);
				res.send(updatedAddress);
			} catch (error) {
				console.error(error);
				res.send(error);
			}
		});
	};

	getAddress();
	getAllAddresses();
	putAddress();

	return { getAddress, getAllAddresses, postAddress };
};
