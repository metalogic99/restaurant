import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { companyInfo } from "@/constant";
import Link from "next/link";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function PreOrderPopUp({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button>Open Popup</Button>
      </DialogTrigger> */}

      <DialogContent className="w-fit rounded-xl bg-heroBackground border-none shadow-lg py-10 px-8 font-inter">
        <DialogTitle></DialogTitle>
        <div className="w-full text-center space-y-4 text-xl">
          <div className=" rounded-md p-4">
            <p className=" text-black">
              To pre order food feel free to contact
            </p>

            <p className="text-forestGreenLight font-semibold">
              +977 {companyInfo.number}.
            </p>
          </div>

          <Link href="/guest/menu">
            <Button className="bg-orange hover:bg-orange/90 text-white px-6 py-7 rounded-md text-md font-semibold">
              View Menu
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
