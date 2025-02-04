import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import Link from 'next/link'

export function DobbyAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState('start')

  const handleClose = () => {
    setIsOpen(false)
    setStep('start')
  }

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full p-4 bg-white hover:bg-amber-700 text-white"
        onClick={() => setIsOpen(true)}
      >
        <img src="/dobby.svg" alt="Dobby Assistant" className="h-6 w-6" />
        <span className="sr-only">Dobby Assistant</span>
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-amber bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full sm:max-w-[425px]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Dobby</h3>
              <Button onClick={handleClose} className="text-gray-500 bg-primary text-white hover:text-gray-700">X</Button>
            </div>
            <p className="text-sm text-gray-600">How can I help you today wizard🧙‍♂️✨?</p>

            {step === 'start' && (
              <div className="grid gap-4 py-4 ">
                <Button onClick={() => setStep('reservation')} className='bg-primary text-white'>Reservation information</Button>
                <Button onClick={() => setStep('menu')} className='bg-primary text-white'>Menu information</Button>
                <Button onClick={() => setStep('question')} className='bg-primary text-white'>Ask a question</Button>
              </div>
            )}
            {step === 'reservation' && <ReservationInfo onBack={() => setStep('start')} />}
            {step === 'menu' && <MenuInfo onBack={() => setStep('start')} />}
            {step === 'question' && <QuestionForm onBack={() => setStep('start')} />}
          </div>
        </div>
      )}
    </>
  )
}

function ReservationInfo({ onBack }: { onBack: () => void }) {
  return (
    <div className="grid gap-4 py-4">
      <h3 className="text-lg font-semibold">Reservation Information</h3>
      <p>At The Three Broomsticks, we love offering a unique culinary experience to our diners. To make a reservation:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Choose the desired date and time</li>
        <li>Specify the number of guests</li>
        <li>Select a desired table number</li>
      </ul>
      <p>We recommend making your reservation at least 24 hours in advance to ensure availability.</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Link href="/getBooking" passHref>
          <Button className='bg-primary text-white'>Make Reservation</Button>
        </Link>
      </div>
    </div>
  )
}

function MenuInfo({ onBack }: { onBack: () => void }) {
  return (
    <div className="grid gap-4 py-4">
      <h3 className="text-lg font-semibold">Our Menu</h3>
      <p>Enjoy our selection of gourmet dishes:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>The Butterbeer Beast</li>
        <li>Hagrid’s Classic Burger</li>
        <li>Dragon Wings</li>
        <li>Magical Caesar Salad</li>
      </ul>
      <p className="text-sm text-gray-500">The menu changes weekly, so please check back often.</p>
      <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={onBack}>Back</Button>
        <Link href="/menu" passHref>
          <Button className='bg-primary text-white'>View Full Menu</Button>
        </Link>
      </div>
    </div>
  )
}

function QuestionForm({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() === '') return

    setMessages(prev => [...prev, { text: inputValue, isUser: true }])

    setTimeout(() => {
      const botResponse = getBotResponse(inputValue)
      setMessages(prev => [...prev, { text: botResponse, isUser: false }])
    }, 1000)

    setInputValue('')
  }

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes('hours') || lowerQuestion.includes('time')) {
      return 'Our hours are Tuesday to Sunday, from 10:00 to 23:00.'
    } else if (lowerQuestion.includes('reservation')) {
      return 'You can make a reservation by calling 3203810987 or selecting the "Make a Reservation" option in this virtual assistant.'
    } else if (lowerQuestion.includes('menu') || lowerQuestion.includes('dishes')) {
      return 'Our menu changes weekly. You can view the current options by selecting "View Menu" in our Dobby assistant.'
    } else {
      return 'Sorry, I do not understand your question. Can you rephrase it or choose one of the available options in the assistant (try: menu, dishes, time)?'
    }
  }

  return (
    <div className="grid gap-4 py-4 h-[400px] flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your question here"
          className="flex-grow"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
      <Button variant="outline" onClick={onBack}>Back</Button>
    </div>
  )
}
