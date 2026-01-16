// Mock Data
const creators = [
    {
        id: 1,
        name: "Mia Khalifa",
        username: "miakhalifa",
        avatar: "https://cf-img-a-in.tosshub.com/sites/visualstory/stories/2023_10/story_68798/assets/1.png?time=1696920077",
        cover: "https://images.unsplash.com/photo-1620064916958-605375619af8?q=80&w=2000&auto=format&fit=crop",
        subscribers: "12.5M",
        views: "450M"
    },
    {
        id: 2,
        name: "Johnny Sins",
        username: "johnnysins",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBcmfL2liSkvMLJ7KJE925MM7kSlBjx6sPRg&s",
        cover: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=2000&auto=format&fit=crop",
        subscribers: "15M",
        views: "1.2B"
    },
    {
        id: 3,
        name: "Sunny Leone",
        username: "sunnyleone",
        avatar: "https://m.media-amazon.com/images/M/MV5BMTM2Mzc1MDYxOV5BMl5BanBnXkFtZTcwMzc1MDQ4Nw@@._V1_FMjpg_UX1000_.jpg",
        cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
        subscribers: "25M",
        views: "900M"
    },
    {
        id: 4,
        name: "Dani Daniels",
        username: "danidaniels",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqrXv8CBiw1BSurZJHCxGQinGda-Poxdx6Zg&s",
        cover: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2000&auto=format&fit=crop",
        subscribers: "18M",
        views: "600M"
    },
];

const categories = [
    { id: 1, name: "Cinematic", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop" },
    { id: 2, name: "POV", image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop" },
    { id: 3, name: "Solo", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop" },
    { id: 4, name: "Couples", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop" },
    { id: 5, name: "Glamour", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop" },
    { id: 6, name: "Artistic", image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=2070&auto=format&fit=crop" },
];

const videos = [
    {
        id: 101,
        title: "Study Break",
        creator: "Mia Khalifa",
        creatorId: 1,
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
        duration: "12:45",
        views: "2.5M",
        date: "2 days ago",
        trending: true,
        new: false,
        desc: "Taking a quick break from the books."
    },
    {
        id: 102,
        title: "The Doctor Is In",
        creator: "Johnny Sins",
        creatorId: 2,
        thumbnail: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?q=80&w=2070&auto=format&fit=crop",
        duration: "08:30",
        views: "1.8M",
        date: "5 hours ago",
        trending: true,
        new: true,
        desc: "A checkup you won't forget."
    },
    {
        id: 103,
        title: "Bollywood Dreams",
        creator: "Sunny Leone",
        creatorId: 3,
        thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop",
        duration: "24:10",
        views: "3.1M",
        date: "1 week ago",
        trending: true,
        new: false,
        desc: "Exclusive dance rehearsal footage."
    },
    {
        id: 104,
        title: "Art of Seduction",
        creator: "Dani Daniels",
        creatorId: 4,
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        duration: "18:20",
        views: "1.5M",
        date: "1 day ago",
        trending: true,
        new: true,
        desc: "Mastering the art of allure."
    },
    {
        id: 105,
        title: "Fan Q&A",
        creator: "Mia Khalifa",
        creatorId: 1,
        thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop",
        duration: "15:00",
        views: "900K",
        date: "3 days ago",
        trending: true,
        new: false,
        desc: "Answering your most burning questions."
    },
    {
        id: 106,
        title: "Workout Routine",
        creator: "Johnny Sins",
        creatorId: 2,
        thumbnail: "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?q=80&w=2070&auto=format&fit=crop",
        duration: "10:15",
        views: "1.1M",
        date: "Just now",
        trending: false,
        new: true,
        desc: "Staying in shape for the job."
    },
    {
        id: 107,
        title: "Late Night Sketch",
        creator: "Dani Daniels",
        creatorId: 4,
        thumbnail: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
        duration: "22:15",
        views: "800K",
        date: "4 days ago",
        trending: false,
        new: false,
        desc: "Getting creative in the studio."
    }
];
