import reviewQuote from "../../assets/reviewQuote.png";

const ReviewCard = ({ review }) => {
    const rating = Number.isFinite(review?.ratings)
        ? review.ratings.toFixed(1)
        : "0.0";

    return (
        <article className="mx-auto flex min-h-[300px] w-full max-w-[420px] flex-col rounded-3xl bg-white p-6 shadow-[0_16px_35px_rgba(7,37,41,0.09)]">
            <img src={reviewQuote} alt="Quote icon" className="h-8 w-8 object-contain opacity-75" />

            <p className="mt-4 flex-1 text-base leading-7 text-[#3F5053]">
                {review?.review || "A posture corrector works by providing support and alignment."}
            </p>

            <div className="my-5 border-t border-dashed border-[#8EBAC0]" />

            <div className="flex items-center gap-3">
                <img
                    src={review?.user_photoURL}
                    alt={review?.userName || "Reviewer"}
                    className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-secondary text-lg font-extrabold leading-tight">
                        {review?.userName || "Anonymous"}
                    </h3>
                    <p className="text-sm text-[#708084]">Verified customer · {rating}/5</p>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;
