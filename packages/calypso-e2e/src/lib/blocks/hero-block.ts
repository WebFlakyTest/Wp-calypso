/**
 * Internal dependencies
 */
import { BaseBlock } from '../base-block';

import { Page } from 'playwright';

const selectors = {
	block: '.wp-block-coblocks-hero',
};

/**
 * Represents the Hero coblock.
 */
export class HeroBlock extends BaseBlock {
	static async validatePublishedContent( page: Page ): Promise< void > {
		await page.isVisible( selectors.block );
	}
}
