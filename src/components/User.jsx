import "./User.scss";
import icons from "../img/symbol-defs.svg";
import Loader from "./Loader";
import React from "react";

const User = ({ userDetails, isSuccess, error, isLoading }) => {
	const twitterUsername = userDetails.twitter ? `${userDetails.twitter}` : "Not Available";
	const isTwitterAvail = userDetails.twitter ? true : false;

	const bio = userDetails.bio || "This profile has no bio.";
	const company = userDetails.company || "Not available";
	const location = userDetails.location || "Not available";

	return (
		<main className="user">
			{isLoading ? (
				<Loader />
			) : isSuccess ? (
				<React.Fragment>
					<div className="user__avtar">
						<img src={userDetails.avatar_url} alt="user-avtar" />
					</div>
					<div className="user__header">
						<div className="user_names">
							<h2 className="fs-lg user__name">{userDetails.name}</h2>
							<p className="fs-md fc-blue user__username">{`@${userDetails.login}`}</p>
						</div>
						<p className="fs-sm fc-grey user_joined">{userDetails.joined}</p>
					</div>
					<div className="user__info">
						<p className="fs-md mb-sm user__bio">{bio}</p>
						<div className="mb-sm user__stats">
							<div className="user__repos">
								<h3 className="fs-sm fc-grey">Repos</h3>
								<p className="fs-lg bold">{userDetails.repos}</p>
							</div>
							<div className="user__followers">
								<h3 className="fs-sm fc-grey">Followers</h3>
								<p className="fs-lg bold">{userDetails.followers}</p>
							</div>
							<div className="user__followings">
								<h3 className="fs-sm fc-grey">Followings</h3>
								<p className="fs-lg bold">{userDetails.following}</p>
							</div>
						</div>
						<div className="user__links">
							<div className="user__link user__location">
								<svg className="svg svg-white">
									<use href={icons + "#icon-location_pin"}></use>
								</svg>
								<p className="fc-grey">{location}</p>
							</div>
							<div className="user__link user__twitter">
								<svg className={`svg ${isTwitterAvail ? "svg-white" : "svg-grey"}`}>
									<use href={icons + "#icon-twitter"}></use>
								</svg>
								{isTwitterAvail ? (
									<a href={`https://twitter.com/${userDetails.twitter}`} className="fc-grey">
										{twitterUsername}
									</a>
								) : (
									<p className="fc-grey">{twitterUsername}</p>
								)}
							</div>
							<div className="user__link user__location">
								<svg className="svg svg-white">
									<use href={icons + "#icon-link"}></use>
								</svg>
								<a href={userDetails.link} className="fc-grey">
									{userDetails.link}
								</a>
							</div>
							<div className="user__link user__company">
								<svg className="svg svg-white">
									<use href={icons + "#icon-apartment"}></use>
								</svg>
								<p className="fc-grey">{company}</p>
							</div>
						</div>
					</div>
				</React.Fragment>
			) : (
				<p className="error">{`${error}.Try Again!!`}</p>
			)}
		</main>
	);
};

export default User;
