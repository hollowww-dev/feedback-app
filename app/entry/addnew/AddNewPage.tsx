"use client";

import styles from "@/app/components/Form.module.scss";

import { Category } from "../../types";

import { SubmitHandler, useForm, Controller } from "react-hook-form";

import { findCategoryKey } from "@/app/utils";

import Button from "@/app/components/Button";
import Select from "react-select";
import GoBack from "@/app/components/GoBack";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useNotify } from "@/app/contexts/notificationHooks";
import { createEntryHandler } from "@/app/services/feedback";

type Inputs = {
	title: string;
	category: Category;
	description: string;
};

type CategoryOption = {
	value: Category;
	label: string;
};

const categoryOptions: CategoryOption[] = Object.values(Category).map(v => ({
	value: v,
	label: findCategoryKey(v) || v,
}));

const AddNewPage = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<Inputs>({ mode: "onTouched" });

	const notify = useNotify();
	const router = useRouter();

	const send: SubmitHandler<Inputs> = async data => {
		try {
			const entry = await createEntryHandler(data);
			notify(`"${entry?.title}" created.`);
			router.push("/");
		} catch (e) {
			if (e instanceof Error) {
				notify(e.message);
			} else {
				notify("Something went wrong.");
			}
		}
	};

	return (
		<div className={styles.formContainer}>
			<div className={styles.top}>
				<GoBack />
			</div>
			<form onSubmit={handleSubmit(send)}>
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
					<Button type="submit" label="Add feedback" variant="primary" disabled={isSubmitting} />
					<Button type="button" label="Cancel" variant="secondary" disabled={isSubmitting} onClick={() => router.back()} />
				</div>
			</form>
		</div>
	);
};

export default AddNewPage;
