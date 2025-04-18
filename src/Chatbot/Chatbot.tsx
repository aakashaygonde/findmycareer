import { Webchat } from '@botpress/webchat'

export const Chatbot = () => {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Webchat
          clientId='a34b967c-9845-4882-b14d-18bb14ab48e0' 
          configuration={{
            botAvatar: '/src/assets/chatbot.jpg',
            botName: 'Navi',
            color: '#32636e',
            botDescription: "Hi! I’m your personal career buddy — here to help you discover what you’re good at, what excites you, and which paths could lead to a fulfilling future. Whether you're exploring options or need a little nudge, I’m here to make it easier (and more fun) to figure it all out!",
            fontFamily: 'ibm',
            showPoweredBy: false,
          }}
          style={{
            width: '100%',
            height: '600px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        />
      </div>
    )
  }


