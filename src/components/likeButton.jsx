import React from "react";
import { BiSolidLike } from "react-icons/bi";
import { PuffLoader } from "react-spinners";

const LikeButton = ({ isLiked, loading, like, onClick }) => {
  return (
    <button
      className={
        "" +
        (isLiked
          ? "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827] text-blue-600"
          : "flex items-center border font-bold rounded-md p-2 space-x-2 border-[#111827]")
      }
      onClick={onClick}
    >
      <BiSolidLike />
      {loading ? (
        <PuffLoader color="#111827" loading={loading} size={16} />
      ) : (
        <span>{like}</span>
      )}
    </button>
  );
};

export default LikeButton;
