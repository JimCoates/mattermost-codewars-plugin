import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { ReactComponent as CodewarsIcon } from "./icons/codewars.svg";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import LeaderBoard from "./CodewarsLeaderboard";
import CodewarsKata from "./CodewarsKata";
import Submissions from "./Submissions";

interface Props {
	show: boolean;
	setShow: (show: boolean) => void;
}

const CodewarsDialog = (props: Props) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const Header = (
		<div className="flex align-items-center justify-content-start gap-3">
			<Button
				icon={<CodewarsIcon width={"1.5rem"} height={"1.5rem"} />}
				className="p-button-raised p-button-rounded flex justify-content-center align-items-center"
			></Button>
			<h3 className="flex justify-content-center align-items-center">
				KSM Technology Partners Clan
			</h3>
		</div>
	);

	return (
		<Dialog
			header={Header}
			visible={props.show}
			style={{ width: "50vw", height: "75vh" }}
			onHide={() => props.setShow(false)}
		>
			<TabView
				activeIndex={activeIndex}
				onTabChange={(e) => setActiveIndex(e.index)}
			>
				<TabPanel header="Leaderboard">
					<LeaderBoard />
				</TabPanel>
				<TabPanel header="Weekly Kata">
					<CodewarsKata />
				</TabPanel>
				<TabPanel header="Submissions">
					<Submissions />
				</TabPanel>
			</TabView>
		</Dialog>
	);
};

export default CodewarsDialog;
