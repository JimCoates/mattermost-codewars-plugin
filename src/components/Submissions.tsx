import axios from "axios";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { useClan } from "../queries";
import { testKata } from "./TestKata";

interface TableData {
	user: string;
	completed: KataMetadata[];
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
		if (rowData.completed.length > 0) {
			return <div>{rowData.completed[0].name}</div>;
		} else {
			return <div>Is scared to try the kata</div>;
		}
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
					).data.filter((kata) => kata.id === testKata.id),
				};
			})
		);
	}

	return (
		<DataTable value={tableData}>
			<Column field="user"></Column>
			<Column field="slug" body={solutionTemplate} />
		</DataTable>
	);
};

export default Submissions;
//https://www.codewars.com/kata/554a44516729e4d80b000012/solutions/rust?filter=following&sort=newest&invalids=false
