import React from "react";
import "./descriptions.css";
import { TbArrowBigDown, TbArrowBigTop } from "react-icons/tb";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { FaWind } from "react-icons/fa";
import { MdCompress, MdWaterDrop } from "react-icons/md";

const Descriptions = ({ weather, units }) => {
	const tempUnits = units === "metric" ? "℃" : "℉";
	const windUnits = units === "metric" ? "m/s" : "m/h";

	const cards = [
		{
			id: 1,
			icon: <TbArrowBigDown />,
			title: "min",
			data: weather.temp_min.toFixed(),
			unit: tempUnits,
		},
		{
			id: 2,
			icon: <TbArrowBigTop />,
			title: "max",
			data: weather.temp_max.toFixed(),
			unit: tempUnits,
		},
		{
			id: 3,
			icon: <HiOutlineEmojiHappy />,
			title: "feels like",
			data: weather.feels_like.toFixed(),
			unit: tempUnits,
		},
		{
			id: 4,
			icon: <MdCompress />,
			title: "pressure",
			data: weather.pressure,
			unit: "hPa",
		},
		{
			id: 5,
			icon: <MdWaterDrop />,
			title: "humidity",
			data: weather.humidity,
			unit: "%",
		},
		{
			id: 6,
			icon: <FaWind />,
			title: "wind speed",
			data: weather.speed.toFixed(),
			unit: windUnits,
		},
	];

	return (
		<div className="section section__descriptions">
			{cards.map(({ id, icon, title, data, unit }) => (
				<div key={id} className="card">
					<div className="description__card-icon">
						{icon}
						<small>{title}</small>
					</div>
					<h2>{`${data} ${unit}`}</h2>
				</div>
			))}
		</div>
	);
};

export default Descriptions;
