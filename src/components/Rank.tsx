import React from "react";
import { ReactComponent as OneKyu } from "./icons/1kyu.svg";
import { ReactComponent as TwoKyu } from "./icons/2kyu.svg";
import { ReactComponent as ThreeKyu } from "./icons/3kyu.svg";
import { ReactComponent as FourKyu } from "./icons/4kyu.svg";
import { ReactComponent as FiveKyu } from "./icons/5kyu.svg";
import { ReactComponent as SixKyu } from "./icons/6kyu.svg";
import { ReactComponent as SevenKyu } from "./icons/7kyu.svg";
import { ReactComponent as EightKyu } from "./icons/8kyu.svg";

interface Props {
	rank: number;
}

const Rank = (props: Props) => {
	switch (props.rank) {
		case -1:
			return <OneKyu />;
		case -2:
			return <TwoKyu />;
		case -3:
			return <ThreeKyu />;
		case -4:
			return <FourKyu />;
		case -5:
			return <FiveKyu />;
		case -6:
			return <SixKyu />;
		case -7:
			return <SevenKyu />;
		case -8:
			return <EightKyu />;
		default:
			return <EightKyu />;
	}
};
export default Rank;