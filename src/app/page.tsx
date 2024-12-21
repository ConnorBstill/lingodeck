import Link from "next/link";

const urls = [
  'https://utfs.io/f/RhgEDhb3FCXDmzgWUsQIHJBQRNDT8PuUhFqbijE2AXafyoCv',
  'https://utfs.io/f/RhgEDhb3FCXDHyynWOwigUaRfSc3JOQVl9oC0jhWp1nKxd2k',
  'https://utfs.io/f/RhgEDhb3FCXDGC0JU6e3o6jFEPLMXyI8cqvVpemnZTNzulgr',
  'https://utfs.io/f/RhgEDhb3FCXDFa5IQzxLEdfOWURni7zPBxtAXgV4KboTeSDQ'
];

const mockImages = urls.map((url, index) => ({
  id: index +1,
  url
}))

export default function HomePage() {
  return (
    <main className="">
      <div className = "flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48 p-4">
            <img src={image.url} className="w-28 h-28" alt="image" />
          </div>
        ))}
      </div>
      Hello (in progress)
    </main>
  );
}
