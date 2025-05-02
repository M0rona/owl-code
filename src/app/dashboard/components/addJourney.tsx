import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";

export function AddJourney() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          <PlusIcon />
          Adicionar jornada
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escolha sua linguagem</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
