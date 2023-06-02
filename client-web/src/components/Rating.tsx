import { useEffect, useState } from "react";
import { IoStarOutline, IoStar } from "react-icons/io5";

function Rating({
  rating,
  onChange,
}: {
  rating: number;
  onChange: (rating: number) => void;
}) {
  const [c_stars, setStars] = useState(rating);
  const StarLabel = ({ value }: { value: number }) => (
    <label htmlFor={`rating-${value}`} className="cursor-pointer">
      {value <= c_stars ? (
        <IoStar size={16} className="text-yellow-500" />
      ) : (
        <IoStarOutline size={16} />
      )}
    </label>
  );

  const Star = ({ value }: { value: number }) => (
    <>
      <input
        type="radio"
        name="rating"
        value={value}
        id={`rating-${value}`}
        onChange={(e) => {
          const checked = e.target.checked;
          if (checked) setStars(parseInt(e.target.value));
        }}
        className="hidden"
      />
      <StarLabel value={value} />
    </>
  );

  useEffect(() => {
    onChange(c_stars);
  }, [c_stars]);
  return (
    <fieldset className="flex flex-row">
      <Star value={1} />
      <Star value={2} />
      <Star value={3} />
      <Star value={4} />
      <Star value={5} />
    </fieldset>
  );
}

export default Rating;
