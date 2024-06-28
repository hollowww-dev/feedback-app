"use client";

import Button from "@/app/components/Button";
import styles from "@/app/components/Form.module.scss";
import GoBack from "@/app/components/GoBack";
import { useNotify } from "@/app/contexts/notificationHooks";
import useUser from "@/app/hooks/useUser";
import getQueryClient from "@/app/lib/getQueryClient";
import { editEntryHandler, getSingleHandler, removeEntryHandler } from "@/app/services/feedback";
import { Category, Entry, EntryDetailed, NewEntry, Status } from "@/app/types";
import { findCategoryKey, findStatusKey } from "@/app/utils";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { redirect, useParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

type Inputs = {
	title: string;
	category: Category;
	description: string;
	status?: Status;
};

type CategoryOption = {
	value: Category;
	label: string;
};

type StatusOption = {
	value: Status;
	label: string;
};

const categoryOptions: CategoryOption[] = Object.values(Category).map(v => ({
	value: v,
	label: findCategoryKey(v) || v,
}));

const statusOptions: StatusOption[] = Object.values(Status).map(v => ({
	value: v,
	label: findStatusKey(v) || v,
}));

const EditPage = () => {
	const params = useParams<{ id: string }>();

	const { data: entry, isError } = useSuspenseQuery({
		queryKey: ["entries", params.id],
		queryFn: () => getSingleHandler(params.id),
	});

	if (isError || !entry) {
		redirect("/");
	}

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Inputs>({
		mode: "onTouched",
		defaultValues: { title: entry.title, category: entry.category, description: entry.description, status: entry.status },
	});

	const user = useUser();
	const router = useRouter();
	const notify = useNotify();
	const queryClient = getQueryClient();

	const { mutate: editEntry, isPending: isPendingEdit } = useMutation({
		mutationKey: ["editEntry"],
		mutationFn: (content: NewEntry) => editEntryHandler(params.id, content),
		onError: error => {
			if (error instanceof Error) {
				notify(error.message);
			} else {
				notify("Something went wrong.");
			}
		},
		onSuccess: (_data, content) => {
			queryClient.setQueryData(["entries", params.id], (old: EntryDetailed) => {
				return { ...old, ...content };
			});
			queryClient.setQueryData(
				["entries", { status: content.status || entry.status }],
				(old: Entry[]) => old && old.map(entry => (entry.id === params.id ? { ...entry, ...content } : entry))
			);
			queryClient.invalidateQueries({ queryKey: ["stats"] });
			notify("Changes saved.");
			router.replace(`/entry/${params.id}`);
		},
	});

	const { mutate: removeEntry, isPending: isPendingRemove } = useMutation({
		mutationKey: ["removeEntry"],
		mutationFn: () => removeEntryHandler(params.id),
		onError: error => {
			if (error instanceof Error) {
				notify(error.message);
			} else {
				notify("Something went wrong.");
			}
		},
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["entries", params.id] });
			queryClient.setQueryData(["entries", { status: entry.status }], (old: Entry[]) => old && old.filter(entry => entry.id !== params.id));
			queryClient.invalidateQueries({ queryKey: ["stats"] });
			notify("Entry removed.");
			router.replace("/");
		},
	});

	return (
		<div className={styles.formContainer}>
			<div className={styles.top}>
				<GoBack />
			</div>
			<form onSubmit={handleSubmit(data => editEntry(data))}>
				<h2>Create New Feedback</h2>
				<label htmlFor="title">
					<h4>Feedback Title</h4>
					<p>Add a short, descriptive headline</p>
				</label>
				<div className={styles.input}>
					<input
						{...register("title", { required: "Can't be empty" })}
						className={errors?.title?.message ? styles.error : undefined}
						id="title"
					/>
					<span className={styles.errorMessage}>{errors?.title?.message && errors.title.message}</span>
				</div>
				<label htmlFor="category">
					<h4>Category</h4>
					<p>Choose a category for your feedback</p>
				</label>
				<div className={styles.input}>
					<Controller
						control={control}
						defaultValue={categoryOptions[0].value}
						name="category"
						render={({ field }) => (
							<Select
								className={styles.select}
								classNamePrefix="select"
								classNames={{
									control: state => (state.menuIsOpen ? "select__control--is-open" : ""),
								}}
								isSearchable={false}
								ref={field.ref}
								options={categoryOptions}
								value={categoryOptions.find(c => c.value === field.value)}
								onChange={v => field.onChange(v?.value)}
								instanceId="category"
							/>
						)}
					/>
				</div>
				{user?.superUser === true && (
					<>
						<label htmlFor="status">
							<h4>Update status</h4>
							<p>Change feature state</p>
						</label>
						<div className={styles.input}>
							<Controller
								control={control}
								defaultValue={statusOptions[0].value}
								name="status"
								render={({ field }) => (
									<Select
										className={styles.select}
										classNamePrefix="select"
										classNames={{
											control: state => (state.menuIsOpen ? "select__control--is-open" : ""),
										}}
										isSearchable={false}
										ref={field.ref}
										options={statusOptions}
										value={statusOptions.find(c => c.value === field.value)}
										onChange={v => field.onChange(v?.value)}
										instanceId="status"
									/>
								)}
							/>
						</div>
					</>
				)}
				<label htmlFor="description">
					<h4>Feedback Detail</h4>
					<p>Include any specific comments on what should be improved, added, etc.</p>
				</label>
				<div className={styles.input}>
					<textarea
						className={clsx(`${styles.detail}`, errors?.description?.message && `${styles.error}`)}
						{...register("description", { required: "Can't be empty" })}
						id="description"
					/>
					<span className={styles.errorMessage}>{errors?.description?.message && errors.description.message}</span>
				</div>
				<div className={styles.buttons}>
					<Button type="submit" label="Save changes" variant="primary" disabled={isPendingRemove || isPendingEdit} />
					<Button type="button" label="Cancel" variant="secondary" onClick={() => router.back()} />
					<Button type="button" label="Delete" variant="delete" disabled={isPendingRemove || isPendingEdit} onClick={removeEntry} />
				</div>
			</form>
		</div>
	);
};

export default EditPage;
