interface Clan {
	totalPages: number;
	totalCount: number;
	data: UserData[];
}

interface UserData {
	id: string;
	username: string;
	honor: number;
	rank: number;
	score: number;
}
interface UserKata {
	totalPages: number;
	totalItems: number;
	data: KataMetadata[]
}

interface KataMetadata {
		id: string;
		name: string;
		slug: string;
		completedAt: string;
		completedLanguages: string[];
}

interface Kata {
	id: string;
	name: string;
	slug: string;
	category: string;
	publishedAt: string;
	approvedAt: string;
	languages: string[];
	url: string;
	rank: KataRank;
	createdAt: string;
	createdBy: {
		username: string;
		url: string;
	};
	approvedBy: {
		username: string;
		url: string;
	};
	description: string;
	totalAttempts: number;
	totalCompleted: number;
	totalStars: number;
	voteScore: number;
	tags: string[];
	contributorsWanted: boolean;
	unresolved: {
		issues: number;
		suggestions: number;
	};
}

interface KataRank {
	id: number;
	name: string;
	color: string;
}
