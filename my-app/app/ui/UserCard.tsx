import React from 'react'
import Image from 'next/image'

const UserCard = ({userImage,username}:any) => {
  return (
    <div className="flex items-center">
            <Image
              src={userImage}
              alt="User avatar"
              width={32}
              height={32}
              className="rounded-full mr-2"
            />
            <span className="text-sm font-medium">{username}</span>
          </div>
  )
}

export default UserCard