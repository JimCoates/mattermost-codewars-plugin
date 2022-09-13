import { Button } from "primereact/button";
import { Dropdown, DropdownChangeParams } from "primereact/dropdown";
import React, { useState } from "react";
import { testKata } from "./TestKata";

interface Props {
	data: KataMetadata;
}

const LanguageTableCell = (props: Props) => {
	const [language, setLanguage] = useState(
		props.data.completedLanguages.length === 1
			? props.data.completedLanguages[0]
			: undefined
	);
	return (
		<div>
			<div
				className={
					"flex flex-row align-items-center gap-4 justify-content-between"
				}
			>
				<Dropdown
					style={{ width: "50%" }}
					value={language}
					options={props.data.completedLanguages}
					onChange={(e: DropdownChangeParams) => setLanguage(e.value)}
					placeholder="Select a language"
				/>
				<Button
					className="p-button-raised"
					disabled={!language}
					onClick={() =>
						window.open(
							`https://www.codewars.com/kata/${testKata.id}/solutions/${language}?filter=following&sort=newest&invalids=false`,
							"_blank",
							"noopener,noreferrer"
						)
					}
				>
					View Solution
				</Button>
			</div>
		</div>
	);
};

export default LanguageTableCell;
