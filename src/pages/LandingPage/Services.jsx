import React from "react";
import styled from "styled-components";
import service2 from "../client/assets/service2.png";
import service1 from "../client/assets/service1.png";
import service3 from "../client/assets/service3.png";
import service4 from "../client/assets/service4.png";

export default function Services() {
  const data = [
    {
      icon: service1,
      title: "Effortless Stand Reservation",
      subTitle:
        "Explore upcoming events and reserve stands effortlessly with our user-friendly interface, ensuring a seamless booking experience.",
    },
    {
      icon: service2,
      title: "Interactive Fair Map",
      subTitle:
        "Navigate the fair with ease using our interactive map, providing detailed descriptions of each stand and helping you choose the perfect location.",
    },
    {
      icon: service3,
      title: "Convenient Parking Reservation",
      subTitle:
        "Reserve parking spaces conveniently through our platform, ensuring easy access to the venue and saving you time upon arrival.",
    },
    {
      icon: service4,
      title: "Reliable and User-Friendly",
      subTitle:
        "Experience a reliable and user-friendly system that enhances your overall fair participation, making the process both reliable and enjoyable.",
    },
  ];
  return (
    <Section id="services">
      <div className="title-container text-center mb-8">
        <h2 className="text-xl uppercase font-bold mb-2 text-light-brown flex items-center justify-center">
          <span className="border-t-2 border-light-brown w-12 mr-4"></span>
          Nos Services
          <span className="border-t-2 border-light-brown w-12 ml-4"></span>
        
        </h2>
        
      </div>
   
      {data.map((service, index) => (
        <div key={index} className="service">
          <div className="icon">
            <img src={service.icon} alt="" />
          </div>
          <h3>{service.title}</h3>
          <p>{service.subTitle}</p>
        </div>
      ))}
    </Section>
  );
}

const Section = styled.section`
  padding: 5rem 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  .title-container {
    grid-column: 1 / -1; /* Span the title across all columns */
  }
  .service {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background-color: aliceblue;
    box-shadow: 0px 7px 29px 0px rgba(166, 124, 82, 0.2); /* Light brown shadow */
    transition: 0.3s ease-in-out;
    &:hover {
      transform: translateX(0.4rem) translateY(-1rem);
      box-shadow: 0px 5px 15px rgba(166, 124, 82, 0.35); /* Darker light brown shadow on hover */
    }
    .icon {
      img {
        height: 2.4rem;
        filter: brightness(0) invert(0.7); /* Make the icon brown */
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
