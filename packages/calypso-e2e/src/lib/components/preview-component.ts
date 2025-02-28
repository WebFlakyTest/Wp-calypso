/**
 * Internal dependencies
 */
import { BaseContainer } from '../base-container';

/**
 * Type dependencies
 */
import { Page } from 'playwright';

const selectors = {
	previewPane: '.web-preview',
	activateButton: 'text=Activate',
};

/**
 * Component representing the site published preview component.
 *
 * @augments {BaseContainer}
 */
export class PreviewComponent extends BaseContainer {
	/**
	 * Constructs an instance of the component.
	 *
	 * @param {Page} page The underlying page.
	 */
	constructor( page: Page ) {
		super( page, selectors.previewPane );
	}
}
