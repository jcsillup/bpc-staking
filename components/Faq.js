import { useState } from 'react'
import Layout from '../components/Layout'

export default function Faq() {

  const [open, setOpen] = useState(0)

  const faq = [
    {
        q: "When is the official Meta Country Club launch?",
        a: "<p>To create an equal playing field for our community, we will use a raffle system that will require registration on our website via MetaMask. Date for registration will be announced in our Discord in Q1 of 2022.</p>"
    },
    {
        q: "What will the mint price be?",
        a: "<p>The price will vary depending on how early you engage with our community. Early supporters can expect a lower price than the public mint. We will have a whitelist group for those who actively help M.C.C. become a reality.</p>"
    },
    {
        q: "How do I get whitelisted?",
        a: "<p>In order to be whitelisted (guaranteed a membership/NFT) you will have to:</p><br /><p>1. Invite 50 people to our Discord server.</p><p>2. Be active in Discord and other social media outlets (Twitter, Instagram, & TikTok).</p><br /><p>These benchmarks are subject to change as needed. This will be handled by M.C.C. Management.</p>"
    }
]

function handleClick(i) {
  if(open != i) {
      setOpen(i)
  } else {
      setOpen(null)
  }
}

  return (
        <div id="faq" className="-mt-24 pt-24 max-w-screen-sm mx-auto">
            <h2 className="text-white mb-12 text-3xl md:text-5xl text-primary font-medium text-center">FAQ</h2>
            {faq.map((item, i) => {
                return(
                    <div key={i} className="p-4 flex flex-col border border-primary rounded-lg mt-4">
                        <button className="flex justify-between items-center" onClick={() => handleClick(i)}>
                    <h2 className={`text-left flex items-center text-sm md:text-lg font-medium uppercase pr-4 ${open == i ? "text-primary" : "text-gray-700"}`}>
                    {item.q}
                    </h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`transition-all h-5 w-5 sm:h-6 sm:w-6 ${open == i ? "text-primary rotate-90" : "text-gray-700 rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>

                </button>
                <div className="accordion-content" aria-expanded={open != i}>
                    <div className="text-gray-700 text-left mt-2"><div dangerouslySetInnerHTML={{__html: item.a}} /></div>
                    </div>
                </div>
                )
            })}
        </div>
  )
}