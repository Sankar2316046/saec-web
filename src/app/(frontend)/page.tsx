'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MultiSelect } from './_components/multi-select' // We'll create a custom one
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, UploadCloud } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

export default function EventForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState('')
  const [roles, setRoles] = useState<string[]>([])
  const rolesList = ['Faculty', 'HOD', 'Student Coordinator', 'Club Lead']

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold">Create Event</h2>

      <div>
        <Label>Event Type</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="seminar">Seminar</SelectItem>
            <SelectItem value="hackathon">Hackathon</SelectItem>
            <SelectItem value="workshop">Workshop</SelectItem>
            <SelectItem value="webinar">Webinar</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Event Name</Label>
        <Input placeholder="Enter event name" />
      </div>

      <div>
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <Label>Time</Label>
        <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>

      <div>
        <Label>Upload Banner / Poster</Label>
        <Input type="file" accept="image/*" />
      </div>

      <div>
        <Label>Select Verifiers</Label>
        <MultiSelect
          options={rolesList}
          selected={roles}
          setSelected={setRoles}
          placeholder="Select roles"
        />
      </div>

      <div className="text-center">
        <Button type="submit" className="w-full">Submit Event</Button>
      </div>
    </div>
  )
}
