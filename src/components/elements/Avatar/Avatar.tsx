import { User } from "@/types/generated/graphql";
import Image from "next/image";

interface AvatarProps {
  user: Pick<User, "id" | "name" | "imageUrl">;
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="avatar">
      <div className="ring-offset-base-100 w-8 md:w-10 rounded-full ring ring-offset-2 ring-accent">
        <Image
          src={user.imageUrl || "/images/placeholder.png"}
          alt={user.name || "User avatar"}
          width={256}
          height={256}
          priority
        />
      </div>
    </div>
  );
};

export default Avatar;
