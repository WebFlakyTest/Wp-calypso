/**
 * External dependencies
 */
import {
	DataHelper,
	LoginFlow,
	NewPostFlow,
	GutenbergEditorPage,
	PublishedPostPage,
	ClickToTweetBlock,
	PricingTableBlock,
} from '@automattic/calypso-e2e';

describe( DataHelper.createSuiteTitle( 'Gutenberg: CoBlocks', { parallel: false } ), function () {
	describe( DataHelper.createSubsuiteTitle( 'Click to Tweet', { parallel: true } ), function () {
		let gutenbergEditorPage;
		let clickToTweetBlock;
		const blockName = 'Click to Tweet';
		const tweet =
			'The foolish man seeks happiness in the distance. The wise grows it under his feet. — James Oppenheim';

		it( 'Log in', async function () {
			const loginFlow = new LoginFlow( this.page, 'gutenbergSimpleSiteUser' );
			await loginFlow.logIn();
		} );

		it( 'Start new post', async function () {
			const newPostFlow = new NewPostFlow( this.page );
			await newPostFlow.newPostFromNavbar();
			gutenbergEditorPage = await GutenbergEditorPage.Expect( this.page );
		} );

		it( 'Enter post title', async function () {
			await gutenbergEditorPage.enterTitle( blockName );
		} );

		it( `Insert ${ blockName } block`, async function () {
			const blockHandle = await gutenbergEditorPage.addBlock( blockName );
			clickToTweetBlock = new ClickToTweetBlock( blockHandle );
		} );

		it( 'Enter tweet content', async function () {
			await clickToTweetBlock.enterTweetContent( tweet );
		} );

		it( 'Publish and visit post', async function () {
			await gutenbergEditorPage.publish( { visit: true } );
		} );

		it( `${ blockName } block is visible in published post`, async function () {
			const publishedPostPage = await PublishedPostPage.Expect( this.page );
			await publishedPostPage.confirmBlockPresence( '.wp-block-coblocks-click-to-tweet' );
		} );
	} );

	describe( DataHelper.createSubsuiteTitle( 'Pricing Table', { parallel: true } ), function () {
		let gutenbergEditorPage;
		let pricingTableBlock;
		const blockName = 'Pricing Table';
		const price = '888';

		it( 'Log in', async function () {
			const loginFlow = new LoginFlow( this.page, 'gutenbergSimpleSiteUser' );
			await loginFlow.logIn();
		} );

		it( 'Start new post', async function () {
			const newPostFlow = new NewPostFlow( this.page );
			await newPostFlow.newPostFromNavbar();
			gutenbergEditorPage = await GutenbergEditorPage.Expect( this.page );
		} );

		it( 'Enter post title', async function () {
			await gutenbergEditorPage.enterTitle( blockName );
		} );

		it( `Insert ${ blockName } block`, async function () {
			const blockHandle = await gutenbergEditorPage.addBlock( blockName );
			pricingTableBlock = new PricingTableBlock( blockHandle );
		} );

		it( 'Enter pricing', async function () {
			await pricingTableBlock.enterPrice( 'left', price );
		} );

		it( 'Publish and visit post', async function () {
			await gutenbergEditorPage.publish( { visit: true } );
		} );

		it( `${ blockName } block is visible in published post`, async function () {
			const publishedPostPage = await PublishedPostPage.Expect( this.page );
			await publishedPostPage.confirmBlockPresence( '.wp-block-coblocks-pricing-table' );
		} );
	} );

	[
		[ 'Dynamic HR', 'dynamic-separator' ],
		[ 'Hero', 'hero' ],
	].forEach( function ( [ blockName, selector ] ) {
		describe( DataHelper.createSubsuiteTitle( blockName, { parallel: true } ), function () {
			let gutenbergEditorPage;

			it( 'Log in', async function () {
				const loginFlow = new LoginFlow( this.page, 'gutenbergSimpleSiteUser' );
				await loginFlow.logIn();
			} );

			it( 'Start new post', async function () {
				const newPostFlow = new NewPostFlow( this.page );
				await newPostFlow.newPostFromNavbar();
				gutenbergEditorPage = await GutenbergEditorPage.Expect( this.page );
			} );

			it( 'Enter post title', async function () {
				await gutenbergEditorPage.enterTitle( blockName );
			} );

			it( `Insert ${ blockName } block`, async function () {
				await gutenbergEditorPage.addBlock( blockName );
			} );

			it( 'Publish and visit post', async function () {
				await gutenbergEditorPage.publish( { visit: true } );
			} );

			it( `${ blockName } block is visible in published post`, async function () {
				const publishedPostPage = await PublishedPostPage.Expect( this.page );
				await publishedPostPage.confirmBlockPresence( `.wp-block-coblocks-${ selector }` );
			} );
		} );
	} );

	describe(
		DataHelper.createSubsuiteTitle( 'WPCOM-specific gutter controls', { parallel: true } ),
		function () {
			const blockName = 'Pricing Table';
			const gutters = [ 'None', 'Small', 'Medium', 'Large', 'Huge' ];
			let gutenbergEditorPage;
			let pricingTableBlock;

			it( 'Log in', async function () {
				const loginFlow = new LoginFlow( this.page, 'gutenbergSimpleSiteUser' );
				await loginFlow.logIn();
			} );

			it( 'Start new post', async function () {
				const newPostFlow = new NewPostFlow( this.page );
				await newPostFlow.newPostFromNavbar();
				gutenbergEditorPage = await GutenbergEditorPage.Expect( this.page );
			} );

			it( 'Insert Pricing Table block', async function () {
				const blockHandle = await gutenbergEditorPage.addBlock( blockName );
				pricingTableBlock = new PricingTableBlock( blockHandle );
			} );

			it( 'Open settings sidebar', async function () {
				await gutenbergEditorPage.openSidebar();
			} );

			gutters.forEach( async function ( gutterValue ) {
				it( `Set gutter value to ${ gutterValue }`, async function () {
					await pricingTableBlock.setGutter( gutterValue );
				} );
			} );
		}
	);
} );
