"use client";

import styles from "./FeedbackEntryPage.module.scss";
import AddComment from "@components/sections/entry/AddComment";
import Button from "@components/common/Button";
import CommentsList from "@components/sections/entry/CommentsList";
import FeedbackEntry from "@/components/common/FeedbackEntry";
import GoBack from "@components/common/GoBack";
import Permitted from "@components/common/Permitted";
import useUser from "@/hooks/useUser";
import { getSingleHandler } from "@/services/feedback";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

function EntryPage() {
  const params = useParams<{ id: string }>();

  const { data: entry, isError } = useSuspenseQuery({
    queryKey: ["entries", params.id],
    queryFn: () => getSingleHandler(params.id),
  });

  const user = useUser();

  if (isError || !entry) {
    redirect("/");
  }

  return (
    <div className={styles.entryContainer}>
      <div className={styles.top}>
        <GoBack />
        <Permitted
          condition={user?.superUser === true || user?.id === entry.user.id}
        >
          <Link href={`/entry/${params.id}/edit`} replace={true}>
            <Button type="button" label="Edit feedback" variant="edit" />
          </Link>
        </Permitted>
      </div>
      <FeedbackEntry entry={entry} extend={true} />
      <CommentsList comments={entry.comments || []} />
      <AddComment />
    </div>
  );
}

export default EntryPage;
