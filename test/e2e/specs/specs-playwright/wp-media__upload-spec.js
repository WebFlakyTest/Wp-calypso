/**
 * External dependencies
 */
import {
	DataHelper,
	LoginFlow,
	MediaPage,
	SidebarComponent,
	MediaHelper,
} from '@automattic/calypso-e2e';
import assert from 'assert';

describe( DataHelper.createSuiteTitle( 'Media: Upload' ), function () {
	const basename = MediaHelper.getDateString();
	const testFiles = {
		image: MediaHelper.getTestImage( basename + '.jpg' ),
		audio: MediaHelper.getTestAudio( basename + '.mp3' ),
	};
	const invalidFile = MediaHelper.getTestImage( basename + '' );

	// Parametrized test.
	[
		[ 'Simple', 'defaultUser' ],
		[ 'Atomic', 'wooCommerceUser' ],
	].forEach( function ( [ siteType, user ] ) {
		describe( `Upload media files (${ siteType })`, function () {
			let mediaPage;

			it( 'Log In', async function () {
				const loginFlow = new LoginFlow( this.page, user );
				await loginFlow.logIn();
			} );

			it( 'Navigate to Media', async function () {
				const sidebarComponent = await SidebarComponent.Expect( this.page );
				await sidebarComponent.gotoMenu( { item: 'Media' } );
			} );

			it( 'See media gallery', async function () {
				mediaPage = await MediaPage.Expect( this.page );
			} );

			Object.entries( testFiles ).forEach( function ( [ key, value ] ) {
				it( `Upload ${ key } and confirm addition to gallery`, async function () {
					const uploadedItem = await mediaPage.upload( value );
					assert( await uploadedItem.isVisible() );
				} );
			} );

			it( 'Upload a forbidden file type and see the rejection notice', async function () {
				try {
					await mediaPage.upload( invalidFile );
				} catch ( error ) {
					console.log( 'message' + error.message );
					assert.match( error.message, /file type is not supported/ );
				}
			} );
		} );

		after( 'Clean up disk', async function () {
			for ( const filepath of Object.values( testFiles ) ) {
				MediaHelper.deleteFile( filepath );
			}
		} );
	} );
} );
