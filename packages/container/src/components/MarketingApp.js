import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

function MarketingApp() {
	const ref = useRef(null);
	const history = useHistory();

	useEffect(() => {
		const { onParentNavigate } = mount(ref.current, {
			initialPath: history.location.pathname,
			onNavigate: ({ pathname: nextPathName }) => {
				const { pathname } = history.location;
				if (pathname !== nextPathName) {
					history.push(nextPathName);
				}
			}
		});
		history.listen(onParentNavigate);
	}, []);

	return <div ref={ref} />;
}

export default MarketingApp;
