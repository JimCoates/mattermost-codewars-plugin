import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useClan } from "../queries";
import { testKata } from "./TestKata";
import "../App.css";
import { Dropdown } from "primereact/dropdown";
import LanguageTableCell from "./LanguageTableCell";

export interface TableData {
	user: string;
	completed: KataMetadata | undefined;
}

const Submissions = () => {
	const users = useClan();

	const [tableData, setTableData] = useState<TableData[]>([]);

	useEffect(() => {
		const getData = async () => {
			const result = await getTableData();
			setTableData(result);
		};
		getData();
	}, []);

	const solutionTemplate = (rowData: TableData) => {
		if (rowData.completed !== undefined) {
			return <div className={"outofstock"}>completed</div>;
		} else {
			return <div>Is scared to try the kata</div>;
		}
	};

	const completedLanguageTemplate = (rowData: TableData) => {
		return rowData.completed !== undefined ? (
			<LanguageTableCell data={rowData.completed} />
		) : (
			<div></div>
		);
	};

	async function getTableData() {
		return Promise.all(
			users.data!.data.map(async (user) => {
				return {
					user: user.username,
					completed: (
						await axios
							.get<UserKata>(
								"https://www.codewars.com/api/v1/users/" +
									user.username +
									"/code-challenges/completed"
							)
							.then((res) => res.data)
					).data.find((kata) => kata.id === testKata.id),
				};
			})
		);
	}

	return (
		<DataTable className={"submissions"} sortField="slug" value={tableData}>
			<Column field="user"></Column>
			<Column field="slug" body={solutionTemplate} />
			<Column field="languages" body={completedLanguageTemplate} />
		</DataTable>
	);
};

export default Submissions;
//https://www.codewars.com/kata/554a44516729e4d80b000012/solutions/rust?filter=following&sort=newest&invalids=false
