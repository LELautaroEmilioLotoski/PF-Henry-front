import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface DateInputProps {
  date: Date | undefined;
  setDate: (date: Date) => void;
}

export default function DateInput({ date, setDate }: DateInputProps) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium text-gray-700">Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal border-gray-300 hover:border-gray-400"
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {date ? format(date, "PPP") : <span>Select a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-lg shadow-lg">
          <Calendar mode="single" selected={date} onSelect={setDate}  initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
}
