"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TopRatedDoctors from "@/components/home/TopRatedDoctors";
import WhyChooseUs from "@/components/home/WhyChooseUs";

import { getDoctors } from "@/services/doctors";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, []);

  return (
    <>
      <HeroSection />
      <TopRatedDoctors doctors={doctors} loading={loading} />
      <WhyChooseUs />
      <HowItWorks />
    </>
  );
}
