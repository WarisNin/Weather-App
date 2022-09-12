import { useEffect, useState } from "react";
import coldBg from "./assets/cold.jpg";
import hotBg from "./assets/hot.jpg";
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherService";

function App() {
	const [city, setCity] = useState("Bangkok");
	const [weather, setWeather] = useState(null);
	const [units, setUnits] = useState("metric");
	const [bg, setBg] = useState(hotBg);

	useEffect(() => {
		const fetchWeatherData = async () => {
			const data = await getFormattedWeatherData(city, units);
			setWeather(data);

			//dynamic background
			const threshold = units === "metric" ? 20 : 60;
			data.temp <= threshold ? setBg(coldBg) : setBg(hotBg);
		};

		fetchWeatherData();
	}, [units, city]);

	const handleUnitsClick = e => {
		const button = e.currentTarget;
		const currentUnit = button.innerText;

		const isCelsius = currentUnit === "℃";
		button.innerText = isCelsius ? "℉" : "℃";
		setUnits(isCelsius ? "metric" : "imperial");
	};

	const enterKeyPressed = e => {
		if (e.keyCode === 13) {
			setCity(e.currentTarget.value);
			e.currentTarget.blur();
		}
	};

	return (
		<div className="app" style={{ backgroundImage: `url(${bg})` }}>
			<div className="overlay">
				{weather && (
					<div className="container">
						<div className="section section__inputs">
							<input
								type="text"
								name="city"
								onKeyDown={enterKeyPressed}
								placeholder="Enter City..."
							/>
							<button onClick={e => handleUnitsClick(e)}>℉</button>
						</div>
						<div className="section section__temperature">
							<div className="description-icon">
								<h3>{`${weather.name}, ${weather.country}`}</h3>
								<img src={weather.iconURL} alt="weather-icon" />
								<h3>{weather.description}</h3>
							</div>
							<div className="temperature">
								<h1>{`${weather.temp.toFixed()} ${
									units === "metric" ? "℃" : "℉"
								}`}</h1>
							</div>
						</div>

						{/* bottom description */}
						<Descriptions weather={weather} units={units} />
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
