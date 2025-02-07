import { Label } from "@/components/ui/label";

interface GuestsInputProps {
  guests: number;
  setGuests: (guests: number) => void;
}

export default function GuestsInput({ guests, setGuests }: GuestsInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGuests(value === "" ? 1 : parseInt(value, 10));
  };

  return (
    <div>
      <Label htmlFor="guests" className="mb-2 block text-sm font-medium text-gray-700">
        Number of Guests
      </Label>
      <input
        type="number"
        id="guests"
        min={1}
        value={guests}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
