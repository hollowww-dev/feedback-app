import { ReactNode } from "react";

const Permitted = ({ children, condition }: { children: ReactNode; condition: boolean }) => {
	if (!condition) {
		return null;
	} else {
		return children;
	}
};

export default Permitted;
