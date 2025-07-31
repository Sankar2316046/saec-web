"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MultiSelect } from "./multi-select"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, UploadCloud, Sparkles, Clock, Users, FileText, ImageIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function EventForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("")
  const [roles, setRoles] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)

  const rolesList = ["Faculty", "HOD", "Student Coordinator", "Club Lead"]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    // Handle file drop logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Event
          </h1>
          <p className="text-gray-600">Fill in the details to create your amazing event</p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 space-y-8">
          {/* Event Type */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Event Type
            </Label>
            <Select>
              <SelectTrigger className="h-12 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seminar">📚 Seminar</SelectItem>
                <SelectItem value="hackathon">💻 Hackathon</SelectItem>
                <SelectItem value="workshop">🛠️ Workshop</SelectItem>
                <SelectItem value="webinar">🌐 Webinar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Event Name */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Event Name</Label>
            <Input
              placeholder="Enter your event name"
              className="h-12 rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Date and Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                Date
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-blue-600" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Time
              </Label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="h-12 rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Event Description */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Event Description</Label>
            <Textarea
              placeholder="Describe your event in detail..."
              className="min-h-[100px] rounded-xl border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-blue-600" />
              Upload Banner / Poster
            </Label>
            <div
              className={cn(
                "relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50",
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <UploadCloud className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-700">Drop your image here</p>
                  <p className="text-sm text-gray-500">or click to browse files</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Verifiers */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Select Verifiers
            </Label>
            <MultiSelect
              options={rolesList}
              selected={roles}
              setSelected={setRoles}
              placeholder="Choose verifier roles"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">Need help? Contact our support team for assistance.</p>
        </div>
      </div>
    </div>
  )
}
