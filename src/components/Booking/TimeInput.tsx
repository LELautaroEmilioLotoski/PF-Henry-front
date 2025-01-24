import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  time: string;
  setTime: (time: string) => void;
}

export default function TimeInput({ time, setTime }: TimeInputProps) {
  return (
    <div>
      <Label htmlFor="time" className="mb-2 block text-sm font-medium text-gray-700">
        Hour
      </Label>
      <Input
        type="time"
        id="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
