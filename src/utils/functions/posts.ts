import { ShowPhotos, ShowVote } from "../types";

export default function posts(photos: ShowPhotos[], votes: ShowVote[]) {
  const id = JSON.parse(localStorage.getItem("id") as string);

  return photos.map((photo) => {
    const photoVotes =
      votes?.filter((vote) => vote.photo.$id === photo.$id) || [];

    const heartVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Heart",
    ).length;
    const sadVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Sad",
    ).length;
    const coolVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Cool",
    ).length;
    const wowVoteCount = photoVotes.filter(
      (vote) => vote.voteType === "Wow",
    ).length;

    const voteType = photoVotes.find((vote) => vote.user.$id === id)?.voteType;

    return {
      ...photo,
      heartVoteCount,
      sadVoteCount,
      coolVoteCount,
      wowVoteCount,
      voteType,
    };
  });
}
