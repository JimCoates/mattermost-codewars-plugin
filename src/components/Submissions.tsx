import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useClan } from "../queries";
import { testKata } from "./TestKata";
import "../App.css";
import LanguageTableCell from "./LanguageTableCell";

export interface TableData {
	user: string;
	completed: boolean;
	solution: KataMetadata | undefined;
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

	const completedTemplate = (rowData: TableData) => {
		if (rowData.completed) {
			return <div className={"outofstock"}>completed</div>;
		} else {
			return <div>Is scared to try the kata</div>;
		}
	};

	const solutionTemplate = (rowData: TableData) => {
		return rowData.solution !== undefined ? (
			<LanguageTableCell data={rowData.solution} />
		) : (
			<div></div>
		);
	};

	async function getKataMetadata(
		user: UserData
	): Promise<KataMetadata | undefined> {
		return (
			await axios
				.get<UserKata>(
					"https://www.codewars.com/api/v1/users/" +
						user.username +
						"/code-challenges/completed"
				)
				.then((res) => res.data)
		).data.find((kata) => kata.id === testKata.id);
	}

	async function getTableData() {
		return Promise.all(
			users.data!.data.map(async (user) => {
				const metadata = await getKataMetadata(user);
				return {
					user: user.username,
					completed: Boolean(metadata),
					solution: metadata,
				};
			})
		);
	}

	return (
		<DataTable className={"submissions"} value={tableData}>
			<Column field="user" header="User" sortable></Column>
			<Column
				field="completed"
				header="Completed"
				sortable
				body={completedTemplate}
			/>
			<Column field="solution" header="Solution" body={solutionTemplate} />
		</DataTable>
	);
};

export default Submissions;
//https://www.codewars.com/kata/554a44516729e4d80b000012/solutions/rust?filter=following&sort=newest&invalids=false
