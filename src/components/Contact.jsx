import React from 'react'
import { UserIcon } from 'lucide-react'
import { MailIcon } from 'lucide-react'
import { PhoneCall } from 'lucide-react'

function Contact({ contact }) {
  return (
    <div className='flex hover:bg-gray-100  items-center justify-between gap-4 rounded-xl p-3 w-full '>
            <div className='flex gap-4'>

                
                
                <div className="relative inline-block">
  <div className="w-18 h-18 border-[#43a1e0] border rounded-full bg-white overflow-hidden">
    <img src={contact.avatar} alt={contact.name} className="object-cover w-full h-full" />
  </div>

  {/* Online dot outside */}
  {contact.status === 'online' && (
    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
  )}
</div>



         
            <div className='flex items-start my-auto flex-col'>
             <h1>{contact.name}</h1>
             <p className='font-medium text-[0.9rem]'>{contact.role}</p>
              <div className='flex gap-1 text-[0.8rem] items-center'><span className='font-[0.8rem]      '><MailIcon className='w-4 text-gray-400' /></span>{contact.email}</div>
            </div>
            </div>

            
            
            <div className='flex gap-1 text-[1rem]'><span className='font-[0.8rem]'><PhoneCall className='text-[0.8rem] text-gray-400 w-4' /></span>{contact.phone}</div>


        
    </div>
  )
}

export default Contact