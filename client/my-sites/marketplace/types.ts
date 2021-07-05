/**
 * External dependencies
 */
import { YOAST_PREMIUM, YOAST_FREE } from '@automattic/calypso-products';

export interface IProductDefinition {
	defaultPluginSlug: string;
	pluginsToBeInstalled: string[];
	isPurchasableProduct: boolean;
}

export interface IProductCollection {
	readonly [ YOAST_PREMIUM ]: IProductDefinition;
	readonly [ YOAST_FREE ]: IProductDefinition;
}

/**
 * A set of logical product groups, grouped by actual products, to be shown in one product (group) page
 * i.e. : YOAST_PREMIUM, YOAST_FREE are 2 products that belong to the product group YOAST
 * */
export const YOAST = 'YOAST';

export interface IProductGroupCollection {
	[ YOAST ]?: {
		products: IProductCollection;
	};
}
