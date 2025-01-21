'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { reservation } from '@/helpers/auth.helper'
import { useUserContext } from '@/context/UserContext'
 
export default function CreateReservation() {
  const {userNormal} = useUserContext()
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [guests, setGuests] = useState(1)
 
  const userId = userNormal?.id
 
  if(!userId) return null;
 
  const handleSubmit = async(e: React.FormEvent) => {
    if(!date || !time || guests < 1){
      alert("completa todos los datos por favor")
      return;
    }
 
    const userData = {
      date: date.toISOString().split("T")[0],
      time,
      guest: guests,
    };
 
    e.preventDefault()
    try {
      const res = await reservation(userId, userData);
      alert("reserva creada correctamente")
      setDate(undefined);
      setTime("");
      setGuests(1)
    } catch (error) {
      console.log("error" + error);
 
    }
 
  }
 
  return (
    <form onSubmit={handleSubmit} className="m-auto space-y-4 max-w-4xl border">
      <div>
        <Label>Fecha</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label htmlFor="time">Hora</Label>
        <Input 
          type="time" 
          id="time" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="guests">Número de Invitados</Label>
        <Input 
          type="number" 
          id="guests" 
          min={1} 
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
        />
      </div>
      <Button type="submit">Crear Reserva</Button>
    </form>
  )
}