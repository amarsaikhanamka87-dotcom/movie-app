import { Mail, PhoneCallIcon } from "lucide-react";


export function FooterContent() {
  return (
   <div className="bg-[#4338ca] text-[#fafafa] w-screen h-90 p-10" >
    <div className="flex gap-250 p-10">
      <div className="flex flex-col gap-8">
        <img  src="Logo (7).png"/>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex gap-50">
        <div className="flex flex-col gap-7">
          <p>Contact Information</p>
          <div className="flex gap-2">
            <Mail />
            <div>
              <h1>Email:</h1>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <PhoneCallIcon/>
            <div >
              <h1>Phone:</h1>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="flex gap-7 flex-col">
          <p>Follow us </p>
          <div className="flex gap-4">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Youtube</p>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}


