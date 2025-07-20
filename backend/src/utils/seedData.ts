export const items = [
  {
    title: "The Lost Kingdom",
    author: "Jane Doe",
    description: "A fantasy adventure about a forgotten kingdom.",
    genre: ["fantasy"],   // enum: fiction, horror, action, adventure
    status: "completed",  // enum: completed, ongoing, drafted
    coverImage: "", // optional: leave blank to use default
    readCount: 10,
    chapters: [
      {
        title: "Prologue",
        content: "The kingdom was once prosperous, bathed in the golden glow of the sun...",
        chapterNumber: 1,
        order: 1,
      },
      {
        title: "First",
        content: "Elara, a young cartographer with an insatiable curiosity...",
        chapterNumber: 2,
        order: 2,
      },
      {
        title: "Second",
        content: "Her journey began at the Whisperwind Peaks...",
        chapterNumber: 3,
        order: 3,
      },
    ],
  },
  {
    title: "Whispers in the Starlight",
    author: "Alex Vesper",
    description: "A thrilling sci-fi mystery set on a distant space station.",
    genre: ["fiction", "sci-fi"],
    status: "completed",
    coverImage: "",
    readCount: 100,
    chapters: [
      {
        title: "Awakening",
        content: "Commander Jax Rylan jolted awake...",
        chapterNumber: 1,
        order: 1,
      },
      {
        title: "Ghost of the Corridors",
        content: "Venturing into the desolate corridors...",
        chapterNumber: 2,
        order: 2,
      },
      {
        title: "The Anomaly",
        content: "In the central operations deck...",
        chapterNumber: 3,
        order: 3,
      },
    ],
  },
  {
    title: "The Baker's Secret Ingredient",
    author: "Sarah Brown",
    description: "A heartwarming tale of a small-town baker with a magical touch.",
    genre: ["fiction"],
    status: "completed",
    coverImage: "",
    readCount: 0,
    chapters: [
      {
        title: "A Pinch of Magic",
        content: "Elara (not the cartographer, but a baker this time!)...",
        chapterNumber: 1,
        order: 1,
      },
      {
        title: "The Rival's Riddle",
        content: "A new, sleek bakery, 'The Sweet Temptation,'...",
        chapterNumber: 2,
        order: 2,
      },
      {
        title: "A Taste of Kindness",
        content: "One rainy afternoon, Chef Antoine's oven broke down...",
        chapterNumber: 3,
        order: 3,
      },
    ],
  },
];
