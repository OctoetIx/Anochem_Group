import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {

      const depots = [
    {
      city: "Abuja Depot",
      address: [
        "Suite 7, MM Plaza,",
        "Opp. B Division Police Station,",
        "Gwazunu Road Suleja.",
      ],
      phone: "07036802685",
    },
    {
      city: "Ibadan Depot",
      address: ["47, Alabede Street Ibadan, Oyo State."],
      phone: "08056043032",
    },
    {
      city: "Benin Depot",
      address: ["18, M/M Way, Benin City, Edo State"],
      phone: "08038382657",
    },
    {
      city: "Onitsha Depot",
      address: ["17, Ogalonye, Onitsha, Anambra State"],
      phone: "08030879819",
    },
    {
      city: "Awka Depot",
      address: [
        "Shop Nos. 11, 12, 13, 14, D line,",
        "Odera Shopping Complex,",
        "Awka, Anambra State",
      ],
      phone: "08064141516",
    },
    {
      city: "Aba Depot",
      address: [
        "33, Nwamkpa Street,",
        "Okigwe Road, Aba, Abia State,",
      ],
      phone: "08064141516",
    },
      {
      city: "Jos Depot",
      address: [
        "9/14 Sarki Street Jos 08026984320,",
        "8/14 Market Street, Jos 08036904213,",
      ],
      phone: "08026984320, 08036904213",
    },
    {
      city: "Ondo Depot",
      address: [
        "shop no. 59, Akinyele Shopping,",
        "Mall, Sabo, Ondo Ondo State,",
      ],
      phone: "0803692449",
    },
    {
      city: "Makurdi Depot",
      address: [
        "Block K3 No. 45 Moder Market,",
        "Markudi Benue State,",
      ],
      phone: "08036084134",
    },
    {
      city: "Ilorin Depot",
      address: [
        "Alumoh Estate,",
        "Ayetoro Ilorin, Kwara State,",
      ],
      phone: "08047283068",
    },
    {
      city: "Kano Depot",
      address: [
        "N304 Sabon Gari Market, Kono,",
        "Kano State,",
      ],
      phone: "08033285944",
    },
  ];

  return (
   <>
     <div className="min-h-screen bg-white flex flex-col md:flex-row justify-center items-start p-8 md:p-16 gap-10 mt-[100px]">
      {/* Left Side - Contact Form */}
      <motion.div
        className="bg-black text-white p-10 flex-1 w-full rounded-xl shadow-lg"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <form className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-black border border-white p-3 outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-black border border-white p-3 outline-none focus:ring-2 focus:ring-gray-400 transition"
          />
          <textarea
            placeholder="Write a message..."
            rows="6"
            className="w-full bg-black border border-white p-3 outline-none resize-none focus:ring-2 focus:ring-gray-400 transition"
          ></textarea>
          <button
            type="submit"
            className="w-40 bg-yellow-500 text-black font-bold py-3 hover:bg-yellow-600 transition cursor-pointer rounded-md"
          >
            SEND
          </button>
        </form>
      </motion.div>

      {/* Right Side - Office Info */}
      <motion.div
        className="flex-1 text-black"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold mb-6">
          HEAD OFFICE / FACTORY
        </h2>

        <div className="space-y-5 text-gray-800">
          <div className="flex items-start gap-3">
            <MapPin className="text-black mt-1" />
            <p>
              Km 33, Badagry Express Way, Opp. Agbara Industrial Estate,
              Morogbo, Lagos State.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-black mt-1" />
            <p>
              info@anochemgroupng.com,
              <br />
              ezenwagu2008@yahoo.com
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-black mt-1" />
            <p>08033269398, 08035844624</p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-xl md:text-2xl font-extrabold mb-2">
            OPENING TIME
          </h3>
          <p className="font-semibold">Monday - Friday:</p>
          <p className="text-gray-800">
            <span className="font-semibold">Open:</span> 8:00 AM –{" "}
            <br />
            <span className="font-semibold">Close:</span> 6:00 PM
          </p>
          <p className="mt-2 text-gray-800">
            <span className="font-semibold">Saturday – Sunday:</span> Close
          </p>
        </div>
      </motion.div>
    </div>

    <section className="bg-white py-16 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">
        Our Depot Locations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {depots.map((depot, index) => (
          <div key={index} className="text-black leading-relaxed">
            <h3 className="font-bold text-xl mb-3">{depot.city}</h3>
            <div className="space-y-1">
              {depot.address.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            <p className="mt-2 font-medium">Tel {depot.phone}</p>
          </div>
        ))}
      </div>
    </section>
   </>
  );
};

export default ContactPage;
