import { getImageUrl } from "../../api/tmdb";

interface PersonAvatarProps {
  name: string;
  profilePath: string | null | undefined;
  size?: "sm" | "lg";
  className?: string;
}

const PersonAvatar = ({
  name,
  profilePath,
  size = "lg",
  className = "",
}: PersonAvatarProps) => {
  const imageUrl = getImageUrl(profilePath ?? null, size === "sm" ? "w200" : "w500");
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={className}
      />
    );
  }

  return (
    <div
      aria-label={name}
      className={`flex items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.28),_rgba(15,23,42,0.95)_65%)] font-semibold text-cyan-100 ${className}`}
    >
      <span>{initials || "NA"}</span>
    </div>
  );
};

export default PersonAvatar;
