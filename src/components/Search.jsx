import "./Search.scss";
import icons from "../img/symbol-defs.svg";
import { useState } from "react";

const Search = (props) => {
	const [input, setInput] = useState("");

	const onChangeInput = (e) => {
		setInput(e.target.value);
	};

	const onSubmitInput = (e) => {
		e.preventDefault();
		if (!input) return;
		props.onSetQuery(input);
		setInput("");
	};

	return (
		<div className="search mb-sm">
			<form action="" className="search-form" onSubmit={onSubmitInput}>
				<svg className="svg svg-blue">
					<use href={icons + "#icon-search"}></use>
				</svg>
				<input
					type="text"
					className="fs-sm search-bar"
					placeholder="Search GitHub Username..."
					onChange={onChangeInput}
					value={input}
				/>
				<button type="submit" className="btn fs-sm">
					Search
				</button>
			</form>
		</div>
	);
};

export default Search;
