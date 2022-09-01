
import { Button } from "primereact/button";
import { ReactComponent as CodewarsIcon } from "./icons/codewars.svg";

interface Props {
	onClick: () => void;
}

const CodewarsButton = (props: Props) => {
	function handleClick() {
		props.onClick();
	}

	return (
		<Button
			icon={<CodewarsIcon width={"1.5rem"} height={"1.5rem"} />}
			onClick={handleClick}
			className="p-button-raised p-button-rounded"
		></Button>
	);
};

export default CodewarsButton;