import Avatar from "@/components/elements/Avatar/Avatar";
import { Booking, User } from "@/types/generated/graphql";
import Link from "next/link";

interface BookingTableProps {
  bookings: Array<
    Pick<Booking, "id"> & {
      user: Pick<User, "id" | "name" | "imageUrl" | "address">;
    }
  >;
}

const BookingTable = ({ bookings }: BookingTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>
                <div className="flex items-center gap-2.5 md:gap-5">
                  <Avatar user={booking.user} />
                  <Link
                    href={`/profile/${booking.user.id}`}
                    className="font-bold"
                  >
                    {booking.user.name}
                  </Link>
                </div>
              </td>
              <td>{booking.user.address || "Unknown"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
