import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReservationCard from "./ReservationCard";
import { useGetReservationsSearch } from "@/hooks/reservation.hooks";

export function ReservationPop() {
  const { data } = useGetReservationsSearch();
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <div className=" w-full flex justify-end">
            <Button
              type="button"
              className="py-3 px-2 bg-forestGreen text-white font-semibold hover:bg-forestGreenLight"
            >
              Reservations
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-scroll h-[500px]">
          <DialogHeader>
            <DialogTitle>Reservations</DialogTitle>
            <DialogDescription>Total Reservations for today</DialogDescription>
          </DialogHeader>
          {data &&
            data.reservations &&
            data.reservations.length > 0 &&
            data.reservations.map((reservation: any) => (
              <ReservationCard key={reservation._id} item={reservation} />
            ))}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
