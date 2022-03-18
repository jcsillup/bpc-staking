import Layout from "../components/Layout"
import Mint from '../components/Mint'
import Head from '../components/Head'

export default function Home() {
  return (
    <>
    <Head title="Home" />
    <Layout>
      <div className="max-w-screen-md mx-auto pb-12 px-4 md:px-8 pt-12">
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
        <Mint />
      </div>
    </Layout>
    </>
  )
}
