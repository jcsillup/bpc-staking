import Layout from "../components/Layout"
import Mint from '../components/Mint'
import Head from '../components/Head'
import { useState } from "react"
import Link from "next/link"

export default function TermsAndConditions() {

    const [activeTab, setActiveTab] = useState(0)

  return (
    <>
    <Head title="Terms and Conditions" />
    <Layout>
      <div className="max-w-screen-lg mx-auto pb-12 px-4 md:px-8 pt-12">
        <div className="flex justify-center">
        <div className="inline-block bg-white mb-8 md:mb-24 px-8 py-4 rounded-lg shadow-lg">
        <a href="https://bigpicturecoin.com" className="flex items-center justify-center font-bold">
          <img src="/logo.png" className="w-14 mr-4" />
          <div>
            <p className="text-center">Big Picture Coin &reg;</p>
            <p className="text-sm font-normal">www.bigpicturecoin.com</p>
          </div>
          </a>
          </div>
          </div>
          
        <div className="mb-8">
        <Link href="/"><a className="px-6 py-3 font-bold hover:opacity-70">&larr; Return to the front page</a></Link>
        </div>
          <div className="mt-4 bg-white rounded-lg shadow-lg border-gray-200">
          <div className="text-xl">
            <div className="flex items-center justify-center w-full">
            <button onClick={() => setActiveTab(0)} className={`w-1/2 border-b border-b-white pl-8 rounded-tl-lg pr-4 py-4 font-medium ${activeTab == 0 ? "text-black border-r" : "text-gray-500 border-b-gray-200"}`}>Staking</button>
            <button onClick={() => setActiveTab(1)} className={`border-b border-b-white w-1/2 pr-8 pl-4 py-4 font-medium ${activeTab == 1 ? "text-black border-l" : "text-gray-500 border-b border-b-gray-200"}`}>Lottery</button>

            </div>
        </div>
        
        {activeTab == 0 ? <div className="p-4 md:p-12">
                    <h2 className="font-medium mb-1">WHY STAKE BPC TOKEN?</h2>
                    <p className="mb-4">EARN HIGH 3% APY YIELDS FOR 3 YEARS. BPC TOKEN HOLDERS WHO STAKE WILL BE GIVEN UNIQUE OPPORTUNITIES TO PARTICIPATE IN THE PRODUCTION PROCESS. HOW DOES THIS WORK? BPC TOKEN HOLDERS WHO STAKE WILL BE RANDOMLY CHOSEN FOR RED CARPET ACCESS, BACKSTAGE PASSES, AND OTHER FREE GIVE-AWAYS DURING THE PRODUCTION PROCESS.</p>
                    <h2 className="font-medium mb-1">WHO CAN STAKE BPC TOKEN?</h2>
                    <p className="mb-4">ANYONE! THERE ARE 3 TYPES OF BPC TOKEN HOLDERS WHO CHOOSE TO STAKE.</p>
                    <ul className="list-disc pl-5">
                        <li className="mb-2">ANY CRYPTO ENTHUSIAST WHO OWNS BPC TOKEN HOLDER WHO CHOOSES TO STAKE THEIR BPC TOKEN TO SIMPLY EARN A 3% APY FOR 3 YEARS.</li>
                        <li className="mb-2">A BPC TOKEN HOLDER WHO IS A PRODUCTION-INVESTOR, WHO HAS SIGNED OR MADE SOME FORM OF AGREEMENT BETWEEN THEIR ALIGNED PRODUCTION COMPANY, AND THIS PRODUCTION COMPANY HAS IN-TURN SIGNED AN AGREEMENT WITH THE BPC TOKEN PRODUCTION TEAM.</li>
                        <li className="mb-4">A BPC TOKEN HOLDER WHO CHOOSES TO PARTICIPATE IN THE PRODUCTION PROCESS, AND WANTS TO HAVE THE OPPORTUNITY FOR PRODUCTION PROCESS ‘PERKS’, WHILE EARNING POSITIVE APY ON THEIR BPC TOKEN.</li>
                    </ul>
                    <h2 className="font-medium mb-1">WHEN I STAKE MY BPC TOKEN, DO I LOSE IT, OR IS IT STILL IN MY POSSESSION?</h2>
                    <p className="mb-4">STAKING BPC TOKEN REMAINS 100% IN THE POSSESSION OF (YOUR) THE BPC TOKEN HOLDER’S CRYPTO WALLET.</p>
                    <h2 className="font-medium mb-1">CAN I LOSE ANY BPC TOKEN, BY STAKING IN THE BPC TOKEN STAKING?</h2>
                    <p className="mb-4">YES. THE BPC TOKEN STAKING IS A 3-YEAR AGREEMENT, STAKING TERMS BEGINS ON THE DAY OF STAKING. 3% APY IS ACCUMULATED EARNED EVERY 30-DAYS FROM THE FIRST DAY OF STAKING. THE PENALTY FOR WITHDRAWAL OF STAKING YOUR BPC TOKEN DURING THE FIRST YEAR IS: 75%. THE PENALTY FOR WITHDRAWAL OF YOUR BPC TOKEN DURING YEAR TWO IS: 50%. THE PENALTY FOR WITHDRAWAL OF YOUR BPC TOKEN DURING YEAR THREE IS: 25%.</p>
                    <h2 className="font-medium mb-1">IF I WITHDRAW MY BPC TOKEN EARLY, WILL I EARN THE 3% APY THAT I ACCRUED FOR EACH 30-DAYS I HAD STAKED BPC TOKEN?</h2>
                    <p className="mb-4">YES, YOU WILL EARN YOUR AVERAGED 3% APY THAT ACCUMULATED EVERY 30-DAYS UP UNTIL THE DAY YOU BEGAN YOUR STAKING.</p>
                    <h2 className="font-medium mb-1">WHY WOULD I WITHDRAW MY BPC TOKEN EARLY FROM STAKING?</h2>
                    <p className="mb-4">BPC TOKEN HOLDERS WHO STAKE THEIR BPC TOKEN, MAY DECIDE TO WITHDRAW THEIR BPC TOKEN FROM THE STAKING FOR ANY REASON. ONE REASON A BPC TOKEN HOLDER MAY WITHDRAW EARLY FROM STAKING, IS TO EARN A PROFIT AS THE MARKET VALUATION OF BPC TOKEN MAY HAVE 10X FROM THE TIME OF THEIR ORIGINAL DEPOSIT, AND A TOKEN HOLDER WHO STAKES, MAY WISH TO TAKE THEIR PROFIT NOW, INSTEAD OF WAITING FOR THE END OF THE 3 YEAR BPC STAKING TERMS.</p>
                    <h2 className="font-medium mb-1">WHY DOES BPC STAKING HAVE A 3-YEAR TERM COMMITMENT?</h2>
                    <p className="mb-4">THERE IS NO COMMITMENT! BPC TOKEN HOLDERS CAN WITHDRAW THEIR BPC TOKENS, HOWEVER THEY WILL INCUR A PENALTY. 3-YEARS IS THE AVERAGE TIME FOR THE PRODUCTION PROCESS TO COMPLETE A PROJECT FROM BEGINNING TO END!</p>
                    <h2 className="font-medium mb-1">ARE THERE LIMITS TO THE AMOUNT OF BPC TOKEN I CAN STAKE?</h2>
                    <p className="mb-4">YES. PLEASE FOLLOW THE PROMPTS ON THE STAKING PAGE.</p>
        <div className="mt-8">
        <Link href="/"><a className="px-6 py-3 border rounded-lg bg-neutral-900 text-white hover:opacity-70">&larr; Back to front page</a></Link>
        </div>
        </div>

        :
        <div className="p-4 md:p-12">
        <h2 className="font-medium mb-1">WHO CAN PLAY THE BPC FILMMAKERS WEEKLY LOTTERY?</h2>
        <p className="mb-4">ANYONE WITH BPC TOKEN CAN TOSS IN THEIR LUCK TO PLAY AND WIN EVERY WEEK!</p>
        <p className="mb-4">ANY BPC TOKEN HOLDER CAN NAVIGATE THEIR WALLET TO THIS PAGE & PURCHASE BPC LOTTERY ‘TICKETS’ BASED ON THE AMOUNT OF TOKENS THEY CHOOSE TO PLAY WITH. THE PRICE IS LISTED ON THIS PAGE, FOR EACH BPC ‘LOTTERY TICKET’ IN “BPC”.</p>
        <p className="mb-4">ANY BPC LOTTERY ‘TICKETS’ PURCHASED WITH YOUR WALLET PRIOR TO FRIDAYS AT 15:00 PST WILL HAVE A CHANCE TO WIN THE BPC LOTTERY FOR THE WEEK.</p>
        <h2 className="font-medium mb-1">HOW DO I KNOW IF I WON THE BPC TOKEN WEEKLY FILMMAKERS LOTTERY?</h2>
        <p className="mb-4"> THE BPC LOTTERY SYSTEM WILL RANDOMLY SELECT THE BPC LOTTERY WINNER EVERY WEEK AT 15:00 PST, AND THE WINNER WILL BE RELEASED BPC TOKEN INTO THEIR WALLET AUTOMATICALLY BY THE BPC LOTTERY SYSTEM!</p>
        <div className="mt-8">
        <Link href="/"><a className="px-6 py-3 border rounded-lg bg-neutral-900 text-white hover:opacity-70">&larr; Back to front page</a></Link>
        </div>
</div>
  }
                    
                </div>
      </div>
    </Layout>
    </>
  )
}
