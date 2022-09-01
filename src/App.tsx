import React from "react";
import { useState } from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import CodewarsButton from "./components/CodewarsButton";
import CodewarsDialog from "./components/CodewarsDialog";

function App() {
	const [show, setShow] = useState(false);
	function handleShow() {
		setShow(!show);
	}
	return (
		<div className="text-center">
			<CodewarsButton onClick={handleShow} />
			<CodewarsDialog show={show} setShow={handleShow} />
		</div>
	);
}

export default App;
