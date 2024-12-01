import Image from "next/image";

import IllustrationEmpty from "@/assets/suggestions/illustration-empty.svg";
import IconPlus from "@/assets/shared/icon-plus.svg";

import styles from "./NoFeedback.module.scss";

import Button from "../../../../common/Button";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import { useNotify } from "@/contexts/notificationHooks";

const NoFeedback = () => {
  const user = useUser();
  const notify = useNotify();

  return (
    <>
      <div className={styles.noFeedback}>
        <Image src={IllustrationEmpty} alt="No feedback" />
        <h3>There is no feedback yet.</h3>
        <p>
          Got a suggestion? Found a bug that needs to be squashed? We love
          hearing about new ideas to improve our app.
        </p>
        <Link
          onClick={() =>
            !user && notify("You need to be logged in to add feedback.")
          }
          href={(user && "/entry/addnew") || "#"}
          prefetch={true}
        >
          <Button
            type="button"
            label="Add feedback"
            variant="primary"
            icon={IconPlus}
            disabled={!user}
          />
        </Link>
      </div>
    </>
  );
};

export default NoFeedback;
