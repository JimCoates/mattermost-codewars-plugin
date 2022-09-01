import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

async function getCompletedKatas(userId: string) {
	return (await axios.get(
		"https://www.codewars.com/api/v1/users/" +
			{ userId } +
			"/code-challenges/completed"
	)) as UserKata;
}

async function getClanMembers() {
	return (await axios.get(
		"https://www.codewars.com/api/v1/clans/KSM Technology Partners/members"
	)) as Clan;
}

export function useClan() {
	return useQuery(["allies"], async () => {
		const { data } = await axios.get(
			"https://www.codewars.com/api/v1/clans/KSM Technology Partners/members"
		);
		return data as Clan;
	});
}

export async function useClanUsernames() {
	const { data } = useQuery(["allies"], getClanMembers, {
		select: (user: Clan) => user.data.map((user) => user.username),
	});
	return data;
}

export function useCompletedKatas(userId: string) {
	return useQuery(["allies"], async () => {
		const { data } = await axios.get(
			"https://www.codewars.com/api/v1/users/" +
				{ userId } +
				"/code-challenges/completed"
		);
		return data as Clan;
	});
}

export function useClanCompletedKatas() {
	const usernames = useClan().data!.data.map((user) => user.username);

	const results = useQueries({
		queries: usernames.map((userId) => {
			return {
				queryKey: ["user", userId],
				queryFn: () => getCompletedKatas(userId),
			};
		}),
	});
	return results;
}

//https://www.codewars.com/kata/554a44516729e4d80b000012/solutions/rust?filter=following&sort=newest&invalids=false
