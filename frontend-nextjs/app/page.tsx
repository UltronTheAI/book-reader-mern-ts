import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const novels = [
  {
    id: 1,
    title: "The Shadow's Edge",
    author: "Elena Blake",
    description: "A thrilling fantasy novel about a young mage discovering her powers in a world where magic is forbidden.",
    coverImage: "/cover.jpg",
    chapters: 24,
    likes: 1243,
    bookmarks: 567,
    status: "Ongoing",
    genre: ["Fantasy", "Adventure"],
    lastUpdated: "2025-07-19",
  },
  {
    id: 2,
    title: "Quantum Dreams",
    author: "David Chen",
    description: "A science fiction masterpiece that explores the boundaries between reality and consciousness in a post-AI world.",
    coverImage: "/cover.jpg",
    chapters: 36,
    likes: 2891,
    bookmarks: 1432,
    status: "Completed",
    genre: ["Sci-Fi", "Mystery"],
    lastUpdated: "2025-07-15",
  },
  {
    id: 3,
    title: "Whispers of the Void",
    author: "Maya Sinclair",
    description: "A dark cosmic horror tale following an astronaut's descent in to madness after encountering an ancient entity.",
    coverImage: "/cover.jpg",
    chapters: 18,
    likes: 876,
    bookmarks: 321,
    status: "Ongoing",
    genre: ["Horror", "Sci-Fi"],
    lastUpdated: "2025-07-18",
  },
  {
    id: 4,
    title: "The Last Kingdom",
    author: "Liam O’Connor",
    description: "An epic historical fiction saga about a warrior's quest to reclaim his homeland from a tyrannical ruler.",
    coverImage: "/cover.jpg",
    chapters: 42,
    likes: 1954,
    bookmarks: 789,
    status: "Completed",
    genre: ["Historical", "Adventure"],
    lastUpdated: "2025-07-10",
  },
  {
    id: 5,
    title: "Echoes of Eternity",
    author: "Sofia Alvarez",
    description: "A romantic fantasy where two souls are bound across lifetimes, fighting to reunite against cosmic odds.",
    coverImage: "/cover.jpg",
    chapters: 30,
    likes: 1623,
    bookmarks: 654,
    status: "Ongoing",
    genre: ["Romance", "Fantasy"],
    lastUpdated: "2025-07-17",
  },
  {
    id: 6,
    title: "Neon Requiem",
    author: "Kaito Tanaka",
    description: "A cyberpunk thriller about a hacker uncovering a conspiracy in a dystopian megacity ruled by corporations.",
    coverImage: "/cover.jpg",
    chapters: 27,
    likes: 2310,
    bookmarks: 987,
    status: "Ongoing",
    genre: ["Cyberpunk", "Thriller"],
    lastUpdated: "2025-07-20",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookReader</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover thousands of novels across multiple genres. Read, bookmark, and enjoy your favorite stories.
        </p>
      </section>

      {/* Novels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {novels.map((novel) => (
          <Card key={novel.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="relative w-full h-[200px] mb-4">
                <Image
                  src={novel.coverImage}
                  alt={novel.title}
                  fill
                  className="object-cover rounded-t-xl"
                  priority
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{novel.title}</CardTitle>
                  <CardDescription>by {novel.author}</CardDescription>
                </div>
                <Button variant="outline" size="icon" className="rounded-full">
                  <HeartIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{novel.description}</p>
              <div className="flex gap-2 flex-wrap mb-3">
                {novel.genre.map((g) => (
                  <span
                    key={g}
                    className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                  >
                    {g}
                  </span>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{novel.chapters} Chapters</span>
                <span>{novel.status}</span>
              </div>
            </CardContent>

            <CardFooter className="justify-between border-t">
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <HeartIcon className="h-4 w-4" /> {novel.likes}
                </span>
                <span className="flex items-center gap-1">
                  <BookmarkIcon className="h-4 w-4" /> {novel.bookmarks}
                </span>
              </div>
              <Button>
                Start Reading
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Icon components
function HeartIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
      />
    </svg>
  );
}

function BookmarkIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
      />
    </svg>
  );
}

function ArrowRightIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}
