/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { map, pickBy } from 'lodash';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import { Card, Button } from '@automattic/components';
import Gridicon from 'calypso/components/gridicon';
import CurrentThemeButton from './button';
import { connectOptions } from '../theme-options';
import { trackClick } from '../helpers';
import { getActiveTheme, getCanonicalTheme } from 'calypso/state/themes/selectors';
import QueryActiveTheme from 'calypso/components/data/query-active-theme';
import QueryCanonicalTheme from 'calypso/components/data/query-canonical-theme';
import ExternalLink from 'calypso/components/external-link';
import { localizeUrl } from 'calypso/lib/i18n-utils';
import config from '@automattic/calypso-config';

/**
 * Style dependencies
 */
import './style.scss';

/*
 * Show current active theme for a site, with
 * related actions.
 */
class CurrentTheme extends Component {
	static propTypes = {
		options: PropTypes.objectOf(
			PropTypes.shape( {
				label: PropTypes.string,
				icon: PropTypes.string,
				getUrl: PropTypes.func,
			} )
		),
		siteId: PropTypes.number.isRequired,
		// connected props
		currentTheme: PropTypes.object,
	};

	trackClick = ( event ) => trackClick( 'current theme', event );

	render() {
		const { currentTheme, currentThemeId, siteId, translate } = this.props;
		const placeholderText = <span className="current-theme__placeholder">loading...</span>;
		const text = currentTheme && currentTheme.name ? currentTheme.name : placeholderText;

		const options = pickBy(
			this.props.options,
			( option ) =>
				option.icon && ! ( option.hideForTheme && option.hideForTheme( currentThemeId, siteId ) )
		);

		const showScreenshot = currentTheme && currentTheme.screenshot;
		// Some themes have no screenshot, so only show placeholder until details loaded
		const showScreenshotPlaceholder = ! currentTheme;

		return (
			<Card className="current-theme">
				<QueryActiveTheme siteId={ siteId } />
				{ currentThemeId && <QueryCanonicalTheme themeId={ currentThemeId } siteId={ siteId } /> }
				{
					// @TODO Remove this code as well as associated styles after feature flag deploy
					! config.isEnabled( 'theme/showcase-revamp' ) && (
						<div className="current-theme__pre-revamp">
							<div className="current-theme__current">
								{ showScreenshotPlaceholder && <div className="current-theme__img-placeholder" /> }
								{ showScreenshot && (
									<img
										src={ currentTheme.screenshot + '?w=150' }
										className="current-theme__img"
										alt=""
									/>
								) }
								<span className="current-theme__label">{ translate( 'Current Theme' ) }</span>
								<span className="current-theme__name">{ text }</span>
							</div>
							<div
								className={ classNames( 'current-theme__actions', {
									'two-buttons': Object.keys( options ).length === 2,
								} ) }
							>
								{ map( options, ( option, name ) => (
									<CurrentThemeButton
										name={ name }
										key={ name }
										label={ option.label }
										icon={ option.icon }
										href={ currentThemeId && option.getUrl( currentThemeId ) }
										onClick={ this.trackClick }
									/>
								) ) }
							</div>
						</div>
					)
				}
				{ config.isEnabled( 'theme/showcase-revamp' ) && (
					<div className="current-theme__post-revamp">
						<div className="current-theme__current">
							<div className="current-theme__details">
								{ showScreenshotPlaceholder && <div className="current-theme__img-placeholder" /> }
								{ showScreenshot && (
									<img
										src={ currentTheme.screenshot + '?w=150' }
										className="current-theme__img"
										alt=""
									/>
								) }
								<div className="current-theme__description">
									<div className="current-theme__title-wrapper">
										<span className="current-theme__label">
											{ currentTheme && currentTheme.name && translate( 'Current Theme' ) }
										</span>
										<span className="current-theme__name">{ text }</span>
									</div>
									<p>
										{ translate( 'This is the active theme on your site.' ) }{ ' ' }
										<ExternalLink
											href={ localizeUrl( 'https://wordpress.com/support/changing-themes/' ) }
											icon
											target="__blank"
										>
											{ translate( 'Learn more.' ) }
										</ExternalLink>
									</p>
								</div>
							</div>
							<div className={ classNames( 'current-theme__actions' ) }>
								{ map( options, ( option, name ) => (
									<Button
										className={ classNames(
											'current-theme__button',
											'components-button',
											'current-theme__' + this.props.name
										) }
										primary={ option.label.toLowerCase() === 'customize' }
										name={ name }
										key={ name }
										label={ option.label }
										href={ currentThemeId && option.getUrl( currentThemeId ) }
										onClick={ this.trackClick }
									>
										{ option.icon && <Gridicon icon={ option.icon } size={ 18 } /> }
										{ option.label }
									</Button>
								) ) }
							</div>
						</div>
					</div>
				) }
			</Card>
		);
	}
}

const ConnectedCurrentTheme = connectOptions( localize( CurrentTheme ) );

const CurrentThemeWithOptions = ( { siteId, currentTheme, currentThemeId } ) => (
	<ConnectedCurrentTheme
		currentTheme={ currentTheme }
		currentThemeId={ currentThemeId }
		siteId={ siteId }
		source="current theme"
	/>
);

export default connect( ( state, { siteId } ) => {
	const currentThemeId = getActiveTheme( state, siteId );
	return {
		currentThemeId,
		currentTheme: getCanonicalTheme( state, siteId, currentThemeId ),
	};
} )( CurrentThemeWithOptions );
