"use client"

import { IEvent } from '@/lib/mongodb/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Checkout from './Checkout'
import AnimatedButton from '../DinoLayout/AnimatedButton'

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">Sorry, tickets are no longer available.</p>
      ): (
        <>
          <SignedOut>
            <AnimatedButton  width="150px" height="55px"  borderColor="#c99a5b" textColor="#e0c28a"  borderRadius="12px" transparent={false}>
              <Link href="/sign-in">
                Get Tickets
              </Link>
              </AnimatedButton>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  )
}

export default CheckoutButton