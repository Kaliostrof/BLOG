import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');
	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=95b2cbdcc21bcbd85464641813e06bbb',
		)
			.then((resp) => resp.json())
			.then((name, main, weather) => {
				console.log(name.name);
				console.log(name.main);
				console.log(name.weather);
				setCity(name.name);
				setTemperature(Math.round(name.main.temp));
				setWeather(name.weather[0].description);
			});
	}, []);
	return (
		<div className={className}>
			<div>
				<div>Блог веб разработчика</div>
				<div>webdeveloper.ru</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature} градусов, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 2px 17px #000;
	backgtound-color: #fff;
`;
