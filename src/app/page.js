"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TopRatedDoctors from "@/components/home/TopRatedDoctors";
import ReasonsSection from "@/components/home/ReasonsSection";
import StatsSection from "@/components/home/StatsSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import AppDownloadSection from "@/components/home/AppDownloadSection";
import BlogSection from "@/components/home/BlogSection";
import GeriatricsSection from "@/components/home/GeriatricsSection";

import Loading from "@/components/shared/Loading";

import { getDoctors } from "@/services/doctors";
import { getStats } from "@/services/stats";
import { getContent } from "@/services/content";

export default function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [stats, setStats] = useState(null);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [doctorData, statsData, contentData] = await Promise.all([
          getDoctors(),
          getStats(),
          getContent(),
        ]);

        setDoctors(doctorData.data || []);
        setStats(statsData.data || null);
        setContent(contentData.data || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <HeroSection slides={content?.slides} />
      <StatsSection stats={stats} />
      <DepartmentsSection departments={content?.departments} />
      <TopRatedDoctors doctors={doctors} loading={false} />
      <GeriatricsSection geriatrics={content?.geriatrics} />
      <ReasonsSection reasons={content?.reasons} />
      <TestimonialsSection testimonials={content?.testimonials} />
      <HowItWorks steps={content?.steps} />
      <AppDownloadSection />
      <BlogSection posts={content?.posts} />
      <CTASection />
      <FAQSection faqs={content?.faqs} />
    </>
  );
}
