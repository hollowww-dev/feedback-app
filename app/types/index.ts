import { Dispatch } from "react";

export enum Category {
	"UI" = "ui",
	"UX" = "ux",
	"Enhancement" = "enhancement",
	"Bug" = "bug",
	"Feature" = "feature",
}

export enum Status {
	"Suggestion" = "suggestion",
	"Planned" = "planned",
	"In-Progress" = "inprogress",
	"Live" = "live",
}

export interface Entry {
	id: string;
	title: string;
	category: Category;
	upvotes: number;
	status: Status;
	description: string;
	commentsCount: number;
}

export type NewEntry = Omit<Entry, "id" | "commentsCount" | "status" | "upvotes" | "user"> & { status?: Status };

export type User = {
	id: string;
	name: string;
	username: string;
	passwordHash: string;
	upvoted: string[];
	superUser: boolean;
};

export type UserWoutId = Omit<User, "id">;

export type NewUser = Omit<User, "id">;

export type LoggedUser = Omit<User, "passwordHash">;

export type Author = Omit<User, "passwordHash" | "upvoted" | "superUser">;

export type Reply = {
	id: string;
	content: string;
	user: Author;
	replyingTo: string;
	entry: string;
};

export type Comment = {
	id: string;
	content: string;
	user: Author;
	entry: string;
	replies?: Reply[];
};

export type EntryDetailed = Entry & {
	comments?: Comment[];
};
export type RoadmapCount = {
	planned: number;
	inprogress: number;
	live: number;
};

export type NotificationContextAction = { type: "SET"; payload: string } | { type: "CLEAR" };

export type NotificationContextType = {
	state: string | null;
	dispatch: Dispatch<NotificationContextAction>;
};

export type FilterContextType = {
	state: "all" | Category;
	dispatch: Dispatch<{ type: "SET"; payload: "all" | Category }>;
};

type RoadmapCategory = {
	title: string;
	description: string;
	nodes: Entry[];
};

export type Roadmap = {
	planned: RoadmapCategory;
	inprogress: RoadmapCategory;
	live: RoadmapCategory;
};

export type SortBy = {
	label: string;
	value: ["upvotes" | "comments", "asc" | "desc"];
};
