import Image from 'next/image';
import BubbleText from '../../contact/components/BubbleText'

type Review = {
  authorAttribution: {
    displayName: string;
    photoUri?: string;
    uri: string
  };
  flagContentUri: string
  googleMapsUri: string
  name: string
  originalText: {
    languageCode: string
    text: string;
  };
  publishTime: string;
  rating: number;
  relativePublishTimeDescription?: string;
  text: {
    languageCode: string,
    text: string
  }
};


type ReviewsResponse = {
  rating: number;
  userRatingCount: number;
  reviews: Review[];
};


const fetchData = async (): Promise<ReviewsResponse> => {
  const url = process.env.GOOGLE_URL;
  if (!url) {
    throw new Error('GOOGLE_URL environment variable is not defined');
  }
  const res = await fetch(url, {next: {revalidate: 1209600 }});
  const data = await res.json();

  return data;
};

const renderStars = (rating: number) => {
  return [...Array(5)].map((_, index) => (
    <svg
      key={index}
      className={`w-5 h-5 ${index < rating ? 'text-amber-400' : 'text-gray-300'}`}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ));
};

const OpinionsSection = async () => {
  const data = await fetchData();
  const reviews = data.reviews

  return (
    <section className="bg-gray-50 py-16 rounded-lg shadow-lg mb-20" itemScope>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
          <BubbleText text="Co mówią nasi klienci" />
        </h2>
        <p className="text-gray-600 text-center mb-8">
          {data.rating.toFixed(1)} na podstawie {data.userRatingCount} opinii
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <article
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              itemScope
              itemProp="review"
            >
              <div
                className="flex mb-4"
                aria-label={`Ocena: ${review.rating} na 5 gwiazdek`}
                role="img"
              >
                <meta itemProp="ratingValue" content={review.rating.toString()} />
                <meta itemProp="bestRating" content="5" />
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-600 italic mb-4" itemProp="reviewBody">
                {review.originalText.text}
              </p>

              <div className="flex items-center mt-4" itemScope itemType="https://schema.org/Person" itemProp="author">
                {review.authorAttribution.photoUri && (
                  <Image
                    src={review.authorAttribution.photoUri}
                    alt={`Zdjęcie ${review.authorAttribution.displayName}`}
                    className="rounded-full mr-4"
                    width={50}
                    height={50}
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900" itemProp="name">
                    — {review.authorAttribution.displayName}
                  </p>
                  {review.relativePublishTimeDescription && (
                    <p className="text-sm text-gray-500">
                      {review.relativePublishTimeDescription}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};


export default OpinionsSection;

