export default function Roadmap() {

    const roadmap = [
        {
            heading: "Step 1 - Something",
            text: "Once the membership spots have been filled, the M.C.C. Staff will be reinvesting the royalties from the trading of Gophers to give back to the community with larger events, swag, and goals identified by VIP Members.",
            complete: true
        },
        {
            heading: "Phase 2 - Building the Membership",
            text: "Once the membership spots have been filled, the M.C.C. Staff will be reinvesting the royalties from the trading of Gophers to give back to the community with larger events, swag, and goals identified by VIP Members.",
            complete: true
        },
        {
            heading: "Phase 2.5 - Construction of Meta Country Club",
            text: "Once the membership spots have been filled, the M.C.C. Staff will be reinvesting the royalties from the trading of Gophers to give back to the community with larger events, swag, and goals identified by VIP Members.",
            complete: false,
        },
        {
            heading: "Phase 3 - Events & Swag",
            text: "Once the membership spots have been filled, the M.C.C. Staff will be reinvesting the royalties from the trading of Gophers to give back to the community with larger events, swag, and goals identified by VIP Members.",
            complete: false
        },
        {
            heading: "Phase 4 - Future Commitments",
            text: "Once the membership spots have been filled, the M.C.C. Staff will be reinvesting the royalties from the trading of Gophers to give back to the community with larger events, swag, and goals identified by VIP Members.",
            complete: false,
            last: true
        }
    ]

    return(
    <div id="roadmap" className="-mt-24 pt-24">

      <h1 className="text-center text-3xl md:text-5xl font-lobster text-primary my-12">Roadmap</h1>
      {roadmap.map((item, i) => {
          return(
              <div key={i} className="flex items-stretch pb-16">
                  <div className={`before:border before:border-primary relative circle-container ${item.last && "last"}`}>
                      <div className={`circle border-2 border-primary ${item.complete ? "bg-primary" : "bg-transparent"}`} />
                  </div>
                  <div className="ml-6">
                      <h2 className="text-2xl font-medium text-primary">{item.heading}</h2>
                      <div className="" dangerouslySetInnerHTML={{__html: item.text}}/>
                  </div>
            </div>
          )
      })}
     
    </div>
    )
}