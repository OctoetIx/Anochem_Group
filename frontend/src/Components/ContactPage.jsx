// ContactPage.jsx
import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import ContactForm from "./ContactForm";

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
        "Okigwe Road, Aba, Abia State",
      ],
      phone: "08064141516",
    },
    {
      city: "Jos Depot",
      address: [
        "9/14 Sarki Street Jos 08026984320",
        "8/14 Market Street, Jos 08036904213",
      ],
      phone: "08026984320, 08036904213",
    },
    {
      city: "Ondo Depot",
      address: [
        "Shop no. 59, Akinyele Shopping,",
        "Mall, Sabo, Ondo State",
      ],
      phone: "0803692449",
    },
    {
      city: "Makurdi Depot",
      address: [
        "Block K3 No. 45 Moder Market,",
        "Markudi Benue State",
      ],
      phone: "08036084134",
    },
    {
      city: "Ilorin Depot",
      address: [
        "Alumoh Estate,",
        "Ayetoro Ilorin, Kwara State",
      ],
      phone: "08047283068",
    },
    {
      city: "Kano Depot",
      address: [
        "N304 Sabon Gari Market, Kono,",
        "Kano State",
      ],
      phone: "08033285944",
    },
  ];
 return (
    <div className="bg-gray-100 min-h-screen pt-[100px] text-gray-900">
      {/* Contact Form + Head Office side by side */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 px-6 md:px-16 mb-16">
        {/* Left Side - Contact Form */}
        <div className="flex-1 min-h-[300px]">
          <ContactForm />
        </div>

        {/* Right Side - Head Office Info */}
        <div className="flex-1 bg-white p-4 md:p-6 rounded-xl shadow-md min-h-[300px] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-yellow-500">
              HEAD OFFICE / FACTORY
            </h2>

            <div className="space-y-3 text-gray-800">
              <div className="flex items-start gap-2">
                <MapPin className="text-yellow-500 mt-1" />
                <p>
                  Km 33, Badagry Express Way, Opp. Agbara Industrial Estate,
                  Morogbo, Lagos State.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="text-yellow-500 mt-1" />
                <p>
                  info@anochemgroupng.com
                  <br />
                  ezenwagu2008@yahoo.com
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="text-yellow-500 mt-1" />
                <p>08033269398, 08035844624</p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl md:text-2xl font-extrabold mb-1 text-yellow-500">
              OPENING TIME
            </h3>
            <p className="font-semibold">Monday - Friday:</p>
            <p className="text-gray-700">
              <span className="font-semibold">Open:</span> 8:00 AM – 
              <span className="font-semibold"> Close:</span> 6:00 PM
            </p>
            <p className="mt-1 text-gray-700">
              <span className="font-semibold">Saturday – Sunday:</span> Close
            </p>
          </div>
        </div>
      </div>

      {/* Depots Section */}
      <section className="py-16 px-6 md:px-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-yellow-500">
          Our Depot Locations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-gray-800">
          {depots.map((depot, index) => (
            <div key={index} className="space-y-2 bg-white p-4 rounded-lg shadow">
              <h3 className="font-bold text-xl">{depot.city}</h3>
              <div className="space-y-1">
                {depot.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <p className="font-medium">Tel: {depot.phone}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactPage;