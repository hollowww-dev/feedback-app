"use client";

import { Comment } from "@/app/types";

import { useState } from "react";

import styles from "./CommentsList.module.scss";
import AddReply from "../AddReply";

const CommentSingle = ({ comment }: { comment: Comment }) => {
	const [replyingTo, setReplyingTo] = useState<string | null>(null);

	return (
		<div className={styles.commentSingle}>
			<div className={styles.avatar}>{comment.user.name[0]}</div>
			<div className={styles.content}>
				<div className={styles.top}>
					<div className={styles.name}>
						<h4>{comment.user.name}</h4>
						<p>@{comment.user.username}</p>
					</div>
					<span
						onClick={() => (replyingTo !== comment.user.username ? setReplyingTo(comment.user.username) : setReplyingTo(null))}
						className={styles.reply}>
						Reply
					</span>
				</div>
				<p>{comment.content}</p>
				{comment.replies?.map((reply, i) => (
					<div className={`${styles.commentSingle} ${styles.commentReply}`} key={reply.id}>
						<div className={styles.avatar}>{reply.user.name[0]}</div>
						<div className={styles.content}>
							<div className={styles.top}>
								<div className={styles.name}>
									<h4>{reply.user.name}</h4>
									<p>@{reply.user.username}</p>
								</div>
								<span
									onClick={() => (replyingTo !== reply.user.username ? setReplyingTo(reply.user.username) : setReplyingTo(null))}
									className={styles.reply}>
									Reply
								</span>
							</div>
							<p>
								<span className={styles.replyingTo}>@{reply.replyingTo}</span> {reply.content}
							</p>
							{i + 1 === comment?.replies?.length && replyingTo && (
								<AddReply commentId={comment.id} replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
							)}
						</div>
					</div>
				))}
				{comment?.replies?.length === 0 && replyingTo && (
					<AddReply commentId={comment.id} replyingTo={replyingTo} setReplyingTo={setReplyingTo} />
				)}
			</div>
		</div>
	);
};

const CommentsList = ({ comments }: { comments: Comment[] }) => {
	return (
		<div className={styles.commentsList}>
			<h3>
				{comments.length} comment{comments.length !== 1 && "s"}
			</h3>
			{comments.map(comment => (
				<CommentSingle comment={comment} key={comment.id} />
			))}
		</div>
	);
};

export default CommentsList;
