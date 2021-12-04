import { useEffect, useState } from "react";
import "./App.scss";
import icons from "./img/symbol-defs.svg";
import Search from "./components/Search";
import User from "./components/User";

function App() {
	// const API_KEY = "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";
	const url = "https://api.github.com/users/";

	const [query, setQuery] = useState("octocat");
	const [user, setUser] = useState({});
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		const changeTheme = () => {
			if (theme === "dark") {
				document.documentElement.className = "dark-theme";
			} else {
				document.documentElement.className = "light-theme";
			}
		};
		changeTheme();
	}, [theme]);

	useEffect(() => {
		// Function to get github user information from api
		const getData = async () => {
			try {
				setLoading(true);
				const response = await fetch(`${url}${query}`);
				if (!response.ok) {
					throw new Error("No user found");
				}
				const data = await response.json();
				setLoading(false);

				const dt = new Date(data.created_at);
				const months = [
					"Jan",
					"Feb",
					"Mar",
					"Apr",
					"May",
					"Jun",
					"Jul",
					"Aug",
					"Sep",
					"Oct",
					"Nov",
					"Dec"
				];

				const details = {
					name: data.name,
					login: data.login,
					joined: `Joined ${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`,
					bio: data.bio,
					avatar_url: data.avatar_url,
					repos: data.public_repos,
					followers: data.followers,
					following: data.following,
					location: data.location,
					twitter: data.twitter_username,
					link: data.html_url,
					company: data.company
				};
				setSuccess(true);
				setUser(details);
			} catch (error) {
				setLoading(false);
				setSuccess(false);
				setError(error.message);
			}
		};

		getData();
	}, [query]);

	const onClickMode = () => {
		if (theme === "dark") {
			setTheme("light");
		} else {
			setTheme("dark");
		}
	};

	const lightMode = (
		<button className="fs-md fc-dark header__mode light-theme" onClick={onClickMode}>
			<span>Dark</span>
			<svg className="svg svg-dark">
				<use href={icons + "#icon-dark"}></use>
			</svg>
		</button>
	);

	const darkMode = (
		<button className="fs-md fc-white header__mode dark-theme" onClick={onClickMode}>
			<span>Light</span>
			<svg className="svg svg-white">
				<use href={icons + "#icon-light"}></use>
			</svg>
		</button>
	);

	return (
		<div className="app">
			<header className="mb-md header">
				<h1 className="heading--1 header__logo">devfinder</h1>
				{theme === "dark" ? darkMode : lightMode}
			</header>

			<Search onSetQuery={setQuery} />
			<User userDetails={user} isSuccess={success} error={error} isLoading={loading} />
		</div>
	);
}

export default App;
