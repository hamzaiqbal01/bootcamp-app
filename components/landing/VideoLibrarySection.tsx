import { videoLibrary } from "@/lib/data/videos";

export function VideoLibrarySection() {
  return (
    <section id="video-library" className="scroll-mt-24 bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-slate-900 sm:text-[2.5rem]">
            Application and Interview Video Library
          </h2>
          <p className="mt-4 text-[1.1rem] leading-[1.7] text-slate-600">
            Here&apos;s all of our free dental school application and interview
            videos that will help make you a better applicant.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {videoLibrary.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-xl border border-slate-300 bg-slate-900 shadow-sm"
            >
              <div className="aspect-video">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={`YouTube video ${video.id}`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
