import { ThemeProvider } from 'styled-components';
import GlobleStyles from './styles/GlobeStyles';
import { dark } from './styles/Themes';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { useEffect, useRef, useState } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';

import Home from './sections/Home';
import { AnimatePresence } from 'framer-motion';
import About from './sections/About';
import Shop from './sections/Shop';
import ScrollTrigerProxy from './components/ScrollTrigerProxy';
import Banner from './sections/Banner';
import NewArrival from './sections/NewArrival';
import Footer from './sections/Footer';
import Loader from './components/Loader';

function App() {
	const containerRef = useRef(null);

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoaded(true);
		}, 3000);
	}, []);

	return (
		<>
			<GlobleStyles />

			<ThemeProvider theme={dark}>
				<LocomotiveScrollProvider
					options={{
						smooth: true,
						// ... all available Locomotive Scroll instance options
						smartphone: {
							smooth: true,
						},
						tablet: {
							smooth: true,
						},
					}}
					watch={
						[
							//..all the dependencies you want to watch to update the scroll.
							//  Basicaly, you would want to watch page/location changes
							//  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
						]
					}
					containerRef={containerRef}
				>
					<AnimatePresence>{loaded ? null : <Loader />}</AnimatePresence>
					<ScrollTrigerProxy />
					<AnimatePresence>
						<main className='App' data-scroll-container ref={containerRef}>
							<Home />
							<About />
							<Shop />
							<Banner />
							<NewArrival />
							<Footer />
						</main>
					</AnimatePresence>
				</LocomotiveScrollProvider>
			</ThemeProvider>
		</>
	);
}

export default App;
