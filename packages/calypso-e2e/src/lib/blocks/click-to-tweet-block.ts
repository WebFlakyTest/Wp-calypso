/**
 * Internal dependencies
 */
import { BaseBlock } from '../base-block';

const selectors = {
	tweetContent: '.wp-block-coblocks-click-to-tweet__text',
};

/**
 * Represents the Click to Tweet coblock.
 */
export class ClickToTweetBlock extends BaseBlock {
	/**
	 * Given a text string, enters the text into the main tweet body.
	 *
	 * @param {string} text Content to be tweeted.
	 * @returns {Promise<void>} No return value.
	 */
	async enterTweetContent( text: string ): Promise< void > {
		const textArea = await this.block.waitForSelector( selectors.tweetContent );
		await textArea.fill( text );
	}
}
