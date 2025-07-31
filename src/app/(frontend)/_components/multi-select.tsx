"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface MultiSelectProps {
  options: string[]
  selected: string[]
  setSelected: (selected: string[]) => void
  placeholder?: string
}

export function MultiSelect({ options, selected, setSelected, placeholder = "Select items" }: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((item) => item !== option))
    } else {
      setSelected([...selected, option])
    }
  }

  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelected(selected.filter((item) => item !== option))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full h-auto min-h-[48px] justify-between rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors p-3 bg-transparent"
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {selected.length === 0 ? (
              <span className="text-muted-foreground">{placeholder}</span>
            ) : (
              selected.map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 rounded-lg px-2 py-1"
                >
                  {item}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer hover:text-blue-600"
                    onClick={(e) => handleRemove(item, e)}
                  />
                </Badge>
              ))
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 rounded-xl" align="start">
        <div className="max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors",
                selected.includes(option) && "bg-blue-50",
              )}
              onClick={() => handleSelect(option)}
            >
              <div
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded border-2 transition-colors",
                  selected.includes(option) ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300",
                )}
              >
                {selected.includes(option) && <Check className="h-3 w-3" />}
              </div>
              <span className="text-sm font-medium">{option}</span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
