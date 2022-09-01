import React, { useState } from "react";
import { Divider } from "primereact/divider";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import { Button } from "primereact/button";
import Rank from "./Rank";
import { ScrollPanel } from "primereact/scrollpanel";
import { Chip } from "primereact/chip";
import { testKata } from "./TestKata";

const data = testKata;

interface DialogOptions {
	label: string;
	value: string;
}

const CodewarsKata = () => {
	const [language, setLanguage] = useState(null);
	const languageOptions: DialogOptions[] = data.languages.map((lang) => {
		return {
			label: lang,
			value: lang,
		};
	});
	return (
		<div className="flex flex-row">
			<div
				className="flex flex-column  gap-2 align-items-center justify-content-center"
				style={{ minWidth: "20%" }}
			>
				<Dropdown
					style={{ width: "100%" }}
					value={language}
					options={languageOptions}
					onChange={(e: DropdownChangeParams) => setLanguage(e.value)}
					filter
					placeholder="Select a language"
				/>
				<Button
					className="p-button-raised"
					disabled={!language}
					onClick={() =>
						window.open(
							`${data.url}/${language}`,
							"_blank",
							"noopener,noreferrer"
						)
					}
				>
					Train
				</Button>
			</div>
			<Divider layout="vertical" />
			<div className="flex flex-column">
				<div className="flex flex-row align-items-center justify-content-start gap-3">
					<Rank rank={data.rank.id} />
					<h2>{data.name}</h2>
				</div>
				<ScrollPanel className="">
					<p
						dangerouslySetInnerHTML={{
							__html: data.description.replace(/\n/g, "<br/>"),
						}}
					/>
				</ScrollPanel>
				<div className="flex gap-3 align-items-center justify-content-start flex-row">
					{data.tags.map((tag) => {
						return <Chip label={tag}></Chip>;
					})}
				</div>
			</div>
		</div>
	);
};

export default CodewarsKata;