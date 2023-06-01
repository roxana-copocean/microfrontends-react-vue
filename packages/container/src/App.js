import React, { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import Progress from './components/Progress';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'));
const AuthAppLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/Dashboard'));

const generateClassName = createGenerateClassName({
	productionPrefix: 'co'
});

const history = createBrowserHistory();
export default () => {
	const [ isSignedIn, setIsSignedIn ] = useState(false);
	useEffect(
		() => {
			if (isSignedIn) {
				history.push('/dashboard');
			}
		},
		[ isSignedIn ]
	);

	return (
		<Router history={history}>
			<StylesProvider generateClassName={generateClassName}>
				<div>
					<Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
					<Suspense fallback={<Progress />}>
						<Switch>
							<Route path="/auth">
								<AuthAppLazy onSignIn={() => setIsSignedIn(true)} />
							</Route>
							<Route path="/dashboard">
								{!isSignedIn && <Redirect to="/" />}
								<DashboardLazy />
							</Route>
							<Route path="/" component={MarketingAppLazy} />
						</Switch>
					</Suspense>
				</div>
			</StylesProvider>
		</Router>
	);
};
