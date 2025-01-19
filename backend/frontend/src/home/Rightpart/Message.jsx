import React from 'react'

function Message({message}) {
  // console.log("Message data in Message component:", message);

  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? " chat-end" : "chat-start";
  const chatColor = itsMe ? "bg-darkPink" : "bg-lightPink";

  // console.log(message)

  const createdAt=new Date(message.createdAt)
  const formattedTime=createdAt.toLocaleTimeString([],{
    hour: '2-digit',
    minute: '2-digit'
  })
  
  return (
    <div>
      <div className=" p-4">
        <div className={`chat ${chatName}`}>
          <div className={`chat-bubble text-textBrown ${chatColor}`}>{message.message}</div>
        <div className="chat-footer">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}

export default Message
