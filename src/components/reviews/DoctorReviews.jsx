"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@heroui/react";

import { getUserAppointments } from "@/services/appointments";
import {
  createReview,
  getDoctorReviews,
} from "@/services/reviews";

import { showError, showSuccess } from "@/lib/toast";

import { resolveDoctorId } from "@/utils/doctorId";

function StarPicker({ value, onChange }) {
  return (
    <div className="flex gap-1" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`text-2xl transition ${
            star <= value
              ? "text-amber-500"
              : "text-slate-300 hover:text-amber-400"
          }`}
          aria-label={`${star} star`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function DoctorReviews({
  doctor,
  user,
  onRatingUpdated,
}) {
  const doctorId = resolveDoctorId(doctor);

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userEmail = user?.email?.toLowerCase() || "";

  useEffect(() => {
    if (!doctorId) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const reviewResult = await getDoctorReviews(doctorId);
        const list = reviewResult.data || [];
        setReviews(list);

        if (userEmail) {
          setAlreadyReviewed(
            list.some((r) => r.userEmail === userEmail)
          );

          const apptResult = await getUserAppointments(
            user.email
          );
          const bookings = apptResult.data || [];
          const hasBooking = bookings.some(
            (a) => String(a.doctorId) === doctorId
          );
          setCanReview(hasBooking);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [doctorId, user?.email, userEmail]);

  const averageLabel = useMemo(() => {
    if (reviews.length === 0) return null;
    const avg =
      reviews.reduce((s, r) => s + Number(r.rating), 0) /
      reviews.length;
    return avg.toFixed(1);
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    setSubmitting(true);

    try {
      const result = await createReview({
        doctorId,
        userEmail: user.email,
        userName: user.name || user.email,
        rating,
        comment,
      });

      setReviews((prev) => [result.data, ...prev]);
      setAlreadyReviewed(true);
      setComment("");
      showSuccess("Thank you for your review!");

      if (result.doctorRating != null && onRatingUpdated) {
        onRatingUpdated(result.doctorRating);
      }
    } catch (err) {
      showError(
        err.response?.data?.message ||
          err.message ||
          "Could not submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const showForm =
    user && canReview && !alreadyReviewed;

  return (
    <section
      id="reviews"
      className="mt-10 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Patient Reviews
          </h2>
          {averageLabel ? (
            <p className="mt-1 text-sm text-amber-600">
              Average ★ {averageLabel} ({reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"})
            </p>
          ) : (
            <p className="mt-1 text-sm text-slate-500">
              No reviews yet
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-slate-500">Loading reviews…</p>
      ) : (
        <>
          {showForm ? (
            <form
              onSubmit={handleSubmit}
              className="mt-6 rounded-lg border border-slate-100 bg-slate-50 p-4"
            >
              <p className="mb-3 text-sm font-medium text-slate-700">
                Share your experience with {doctor.name}
              </p>
              <StarPicker value={rating} onChange={setRating} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review (optional)"
                rows={3}
                className="textarea textarea-bordered mt-3 w-full"
              />
              <Button
                type="submit"
                variant="primary"
                className="mt-3"
                isDisabled={submitting}
              >
                {submitting ? "Submitting…" : "Submit Review"}
              </Button>
            </form>
          ) : null}

          {!user ? (
            <p className="mt-4 text-sm text-slate-500">
              Log in and book an appointment to leave a review.
            </p>
          ) : null}

          {user && !canReview && !alreadyReviewed ? (
            <p className="mt-4 text-sm text-slate-500">
              Book an appointment with this doctor first, then you
              can leave a review.
            </p>
          ) : null}

          {alreadyReviewed ? (
            <p className="mt-4 text-sm text-green-700">
              You have already reviewed this doctor. Thank you!
            </p>
          ) : null}

          <ul className="mt-6 space-y-4">
            {reviews.map((item) => (
              <li
                key={item._id}
                className="rounded-lg border border-slate-100 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-slate-900">
                    {item.userName || "Patient"}
                  </span>
                  <span className="text-amber-600">
                    {"★".repeat(Number(item.rating) || 0)}
                  </span>
                </div>
                {item.comment ? (
                  <p className="mt-2 text-slate-600">
                    {item.comment}
                  </p>
                ) : null}
                <p className="mt-2 text-xs text-slate-400">
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
