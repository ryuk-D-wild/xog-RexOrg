"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import { useUploadThing } from '@/lib/uploadthing'

import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/mongodb/models/event.model"


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const [startDate, setStartDate] = useState<Date | null>(event ? new Date(event.startDateTime) : null)
  const [endDate, setEndDate] = useState<Date | null>(event ? new Date(event.endDateTime) : null)
  const initialValues = event && type === 'Update' 
    ? { 
      ...event, 
      startDateTime: new Date(event.startDateTime), 
      endDateTime: new Date(event.endDateTime) 
    }
    : eventDefaultValues;
  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    let uploadedImageUrl = values.imageUrl;

    if (files.length > 0) {
      try {
        const uploadedImages = await startUpload(files)

        if (!uploadedImages) {
          throw new Error('Image upload failed');
        }

        uploadedImageUrl = uploadedImages[0].url
      } catch (error) {
        console.error("Error uploading image:", error)
        return; // Prevent form submission if image upload fails
      }
    }

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset()
          setFiles([]) // Reset files state
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.error('Error creating event:', error)
      }
    }

    if(type === 'Update') {
      if(!eventId) {
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 bg-opacity-40 backdrop-blur-lg p-6 rounded-xl shadow-md border border-white/20">
    <div className="flex flex-col gap-5 md:flex-row">
      <FormField control={form.control} name="title" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="Event title" {...field} className="input-glass flex items-center h-[54px] w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="categoryId" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Dropdown onChangeHandler={field.onChange} value={field.value}  />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>

    <div className="flex flex-col gap-5 md:flex-row">
      <FormField control={form.control} name="description" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Textarea placeholder="Description" {...field} className="input-glass flex items-center h-[54px] w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="imageUrl" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles}  />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>

    <div className="flex flex-col gap-5 md:flex-row">
      <FormField control={form.control} name="location" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex items-center h-[54px] w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white">
              <Image src="/assets/icons/location-grey.svg" alt="location" width={24} height={24} />
              <Input placeholder="Event location or Online" {...field} className="ml-3 bg-transparent border-none text-white outline-none w-full" />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>

    <div className="flex flex-col gap-5 md:flex-row">
      <FormField control={form.control} name="startDateTime" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              type="datetime-local"
              {...field}
              value={
                field.value instanceof Date
                  ? field.value.toISOString().slice(0, 16)
                  : field.value
              }
              onChange={(e) => field.onChange(new Date(e.target.value))}
              className="flex items-center h-[54px] w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="endDateTime" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input
              type="datetime-local"
              {...field}
              value={
                field.value instanceof Date
                  ? field.value.toISOString().slice(0, 16)
                  : field.value
              }
              onChange={(e) => field.onChange(new Date(e.target.value))}
              className="flex items-center h-[54px] w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>

    <div className="flex flex-col gap-5 md:flex-row">
      <FormField control={form.control} name="price" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <div className="flex items-center h-[54px] w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white">
              <Image src="/assets/icons/dollar.svg" alt="price" width={24} height={24} />
              <Input type="number" placeholder="Price" {...field} className="ml-3 bg-transparent border-none text-white outline-none w-full" />
              <FormField control={form.control} name="isFree" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center">
                      <label htmlFor="isFree" className="whitespace-nowrap pr-3">Free Ticket</label>
                      <Checkbox onCheckedChange={field.onChange} checked={field.value} id="isFree" className="h-5 w-5 border-2 border-blue-500" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="url" render={({ field }) => (
        <FormItem className="w-full">
          <FormControl>
            <Input placeholder="Event URL" {...field} className="input-glass w-full px-4 py-3 rounded-lg text-white border border-gray-600 focus:ring-2 focus:ring-blue-500" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
    </div>

    <Button type="submit" disabled={form.formState.isSubmitting} className="btn-glow w-full py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all">
    {form.formState.isSubmitting ? (
            'Submitting...'
          ): `${type} Event `}
    </Button>
  </form>
</Form>

  )
}

export default EventForm