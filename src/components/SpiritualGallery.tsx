import React from 'react';

const galleryImages = [
  {
    id: 1,
    url: '/src/assets/images/meditation_nature_1_1787511449231.jpg',
    title: 'पहाटेचे शांत सरोवर',
    alt: 'Serene mountain lake at sunrise',
  },
  {
    id: 2,
    url: '/src/assets/images/deity_focus_1_1787511466167.jpg',
    title: 'ध्यानस्थ दिव्य रूप',
    alt: 'Divine figure in meditation',
  },
  {
    id: 3,
    url: '/src/assets/images/meditation_nature_2_1787511480061.jpg',
    title: 'निसर्गाचे सानिध्य',
    alt: 'Serene forest scene',
  },
];

export const SpiritualGallery: React.FC = () => {
  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-display font-bold text-white font-marathi mb-8 text-center">
        आध्यात्मिक गॅलरी (Spiritual Gallery)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryImages.map((image) => (
          <div
            key={image.id}
            className="rounded-3xl overflow-hidden border border-purple-500/20 shadow-2xl group transition-all duration-300 hover:scale-105"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-slate-950/80 backdrop-blur-sm">
              <p className="text-white font-marathi text-center">{image.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
