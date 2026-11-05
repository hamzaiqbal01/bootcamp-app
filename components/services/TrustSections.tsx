import { TeamCarousel } from "@/components/landing/home/TeamCarousel";
import { coaches } from "@/lib/data/coaches";
import { testimonials } from "@/lib/data/reviews";

// Shared trust blocks for service and DAT pages: the tutor cards (with intro videos) and student reviews
// (the video review first, then written reviews that expand on demand).

const sectionTitle =
  "text-[clamp(24px,3vw,34px)] leading-tight font-extrabold tracking-[-0.02em] text-[#0B1B3A]";

/** Every tutor, with the ids in `firstIds` first. */
export function orderedTutors(firstIds: string[]) {
  return [
    ...firstIds
      .map((id) => coaches.find((coach) => coach.id === id))
      .filter((c) => c !== undefined),
    ...coaches.filter((coach) => !firstIds.includes(coach.id)),
  ];
}

/** The tutor carousel, in the same order as the Team section on the home page, on every page. */
export function TutorsSection({
  title = "Meet the tutors",
  intro = "Dentists and dental students who went through admissions recently. Press play to hear from them; your tutor is matched after the free call.",
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <section className="bg-[#F7F9FD] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className={sectionTitle}>{title}</h2>
        <p className="mt-3 mb-8 max-w-[64ch] text-[16px] leading-relaxed text-[#5B6782]">
          {intro}
        </p>
        <TeamCarousel coaches={coaches} />
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .replace(/\./g, "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

const FIRST_VISIBLE = 4;

function ReviewCard({
  review,
  id,
}: {
  review: (typeof testimonials)[number];
  id: string;
}) {
  return (
    <figure className="flex flex-col rounded-[20px] border border-[#E4E9F2] bg-[#F7F9FD] p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8EFFD] text-[13px] font-extrabold text-[#1F5BD8]">
          {initials(review.author)}
        </span>
        <figcaption>
          <span className="block text-[14px] font-bold text-[#0B1B3A]">
            {review.author}
          </span>
          <span
            className="block text-[12px] tracking-[1.5px] text-[#E7A400]"
            aria-label="5 stars"
          >
            ★★★★★
          </span>
        </figcaption>
      </div>
      {/* CSS-only "Read more": the full text stays in the HTML, clamped until expanded. */}
      <input type="checkbox" id={id} className="peer sr-only" />
      <blockquote className="mt-3 line-clamp-4 text-[14.5px] leading-relaxed text-[#33415C] peer-checked:line-clamp-none">
        “{review.quote}”
      </blockquote>
      {review.quote.length > 200 ? (
        <label
          htmlFor={id}
          className="mt-2 w-fit cursor-pointer text-[13px] font-bold text-[#1F5BD8] hover:underline peer-checked:hidden"
        >
          Read more
        </label>
      ) : null}
    </figure>
  );
}

/** The same reviews on every page: the video review, then every written review (4 shown, the rest on demand). */
export function StudentReviews() {
  const videoReview = testimonials.find((item) => item.video);
  const reviews = testimonials.filter((item) => item !== videoReview);
  const first = reviews.slice(0, FIRST_VISIBLE);
  const rest = reviews.slice(FIRST_VISIBLE);

  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className={sectionTitle}>What students say</h2>
          <p className="text-[14px] text-[#5B6782]">
            <span className="tracking-[2px] text-[#E7A400]" aria-hidden>
              ★★★★★
            </span>{" "}
            <b className="text-[#0B1B3A]">9.8/10</b> from 39 surveyed students
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:items-start">
          {videoReview?.video ? (
            <figure className="overflow-hidden rounded-[20px] border border-[#E4E9F2] bg-white shadow-[0_16px_36px_-30px_rgba(11,27,58,0.45)] lg:sticky lg:top-24">
              <div className="relative aspect-[4/3] bg-[#0B1B3A]">
                <video
                  src={videoReview.video}
                  poster={videoReview.poster}
                  controls
                  playsInline
                  preload="none"
                  controlsList="nodownload"
                  disablePictureInPicture
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10.5px] font-bold tracking-[0.08em] text-[#1F5BD8] uppercase shadow-sm">
                  Video review
                </span>
              </div>
              <figcaption className="p-5">
                <blockquote className="text-[14.5px] leading-relaxed text-[#33415C]">
                  “{videoReview.quote}”
                </blockquote>
                <p className="mt-3 text-[13.5px] font-bold text-[#0B1B3A]">
                  {videoReview.author}
                </p>
              </figcaption>
            </figure>
          ) : null}

          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {first.map((review, index) => (
                <ReviewCard
                  key={review.author}
                  review={review}
                  id={`review-more-${index}`}
                />
              ))}
            </div>
            {rest.length > 0 ? (
              <>
                <input
                  type="checkbox"
                  id="reviews-show-all"
                  className="peer sr-only"
                />
                <div className="mt-4 hidden gap-4 peer-checked:grid sm:grid-cols-2">
                  {rest.map((review, index) => (
                    <ReviewCard
                      key={review.author}
                      review={review}
                      id={`review-more-${index + FIRST_VISIBLE}`}
                    />
                  ))}
                </div>
                <label
                  htmlFor="reviews-show-all"
                  className="mt-5 inline-flex min-h-[44px] cursor-pointer items-center rounded-full border border-[#D5DDEA] bg-white px-6 text-[14px] font-bold text-[#0B1B3A] transition-colors hover:border-[#0B1B3A] peer-checked:hidden"
                >
                  Show all {reviews.length + 1} reviews
                </label>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
