import Image from "next/image";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
  relative_time_description: string;
}

// Forma de la respuesta de Places API (New)
interface GooglePlaceReview {
  rating: number;
  text?: { text: string };
  originalText?: { text: string };
  authorAttribution?: {
    displayName: string;
    photoUri?: string;
  };
  relativePublishTimeDescription?: string;
}

async function getGoogleReviews(): Promise<Review[]> {
  const PLACE_ID = process.env.GOOGLE_PLACE_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!PLACE_ID || !API_KEY) {
    console.error(
      "Faltan GOOGLE_PLACE_ID o GOOGLE_API_KEY en las variables de entorno",
    );
    return [];
  }

  const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "reviews",
      },
      next: { revalidate: 86400 },
    });
    const data = await res.json();

    if (!res.ok) {
      console.error("Google Places API error:", data.error?.message ?? data);
      return [];
    }

    const reviews: GooglePlaceReview[] = data.reviews ?? [];

    return reviews
      .filter((review) => review.rating >= 4)
      .slice(0, 3)
      .map((review) => ({
        author_name: review.authorAttribution?.displayName ?? "Anónimo",
        rating: review.rating,
        text: review.originalText?.text ?? review.text?.text ?? "",
        profile_photo_url: review.authorAttribution?.photoUri ?? "",
        relative_time_description: review.relativePublishTimeDescription ?? "",
      }));
  } catch (error) {
    console.error("Failed to fetch Google Reviews:", error);
    return [];
  }
}

export default async function ServerReviews() {
  const reviews = await getGoogleReviews();

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section id="resenas" className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-800">
          Reseñas de nuestros clientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <Image
                  src={review.profile_photo_url}
                  alt={review.author_name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-sm">
                    {review.author_name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {review.relative_time_description}
                  </p>
                </div>
              </div>
              <div className="text-yellow-500 mb-2">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="text-sm text-gray-700 line-clamp-4">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
