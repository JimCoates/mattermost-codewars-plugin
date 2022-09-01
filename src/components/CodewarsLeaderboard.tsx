import React from "react";
import { DataTable } from "primereact/datatable";
import { useClan } from "../queries";
import { Column } from "primereact/column";
import Rank from "./Rank";
import { ProgressSpinner } from "primereact/progressspinner";

const LeaderBoard = () => {
	const { status, data, error, isFetching } = useClan();
	const tableData = data !== undefined ? data.data : [];

	const rankTemplate = (rowData: UserData) => {
		return <Rank rank={rowData.rank} />;
	};

	const userTemplate = (rowData: UserData) => {
		return (
			<p
				onClick={() =>
					window.open(
						`https://www.codewars.com/users/${rowData.username}`,
						"_blank",
						"noopener,noreferrer"
					)
				}
			>
				{rowData.username}
			</p>
		);
	};
	return (
		<div>
			{isFetching ? (
				<ProgressSpinner />
			) : (
				<DataTable value={tableData}>
					<Column field="rank" body={rankTemplate}></Column>
					<Column field="username" body={userTemplate}></Column>
					<Column field="honor"></Column>
					<Column field="score"></Column>
				</DataTable>
			)}
		</div>
	);
};

export default LeaderBoard;
