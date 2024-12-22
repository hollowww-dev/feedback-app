import {
  addComment,
  addReply,
  createEntry,
  editEntry,
  removeEntry,
  upvote,
} from "@/actions";
import { Entry, EntryDetailed, NewEntry, Status } from "@/types";

export const getEntriesHandler = async (status: Status): Promise<Entry[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/feedback/entries/${status}`
  ).then((data) => data.json());
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};
export const getStatsHandler = async (): Promise<
  { _id: Status; count: number }[]
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/feedback/stats`
  ).then((data) => data.json());
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const getSingleHandler = async (
  id: string
): Promise<EntryDetailed | null> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/feedback/${id}`
  ).then((data) => data.json());
  if (response.success) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const createEntryHandler = async (content: NewEntry) => {
  const response = await createEntry(content);
  if (response.success && response.data !== null) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const upvoteHandler = async (id: string) => {
  const response = await upvote(id);
  if (!response.success) {
    throw new Error(response.message);
  }
};

export const addCommentHandler = async (id: string, content: string) => {
  const response = await addComment(id, content);
  if (response.success && response.data !== null) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const addReplyHandler = async (
  id: string,
  content: string,
  replyingTo: string
) => {
  const response = await addReply(id, content, replyingTo);
  if (response.success && response.data !== null) {
    return response.data;
  } else {
    throw new Error(response.message);
  }
};

export const editEntryHandler = async (id: string, content: NewEntry) => {
  const response = await editEntry(id, content);
  if (!response.success) {
    throw new Error(response.message);
  }
};

export const removeEntryHandler = async (id: string) => {
  const response = await removeEntry(id);
  if (!response.success) {
    throw new Error(response.message);
  }
};
