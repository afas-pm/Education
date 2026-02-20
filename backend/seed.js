import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CourseModel from './models/courseModel.js';

dotenv.config();

const dummyCourses = [
    {
        id: 1,
        name: "React Masterclass",
        teacher: "Sophia Miller",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
        rating: 4.8,
        category: "Development",
        price: { original: 200, sale: 99 },
        overview: "Master React from fundamentals to advanced patterns. Learn hooks, state management, performance optimization, and real-world project architecture.",
        lectures: [
            {
                id: "1-1",
                title: "Intro & Setup",
                durationMin: 12,
                chapters: [
                    { id: "1-1-1", name: "Course intro", topic: "What we'll build", durationMin: 4, videoUrl: "https://youtu.be/sDoiClRyV_c" },
                    { id: "1-1-2", name: "Environment", topic: "Node, npm, editor setup", durationMin: 8, videoUrl: "https://youtu.be/4eGJp3LBLIA" }
                ]
            }
        ]
    },
    {
        id: 2,
        name: "Frontend Crash Course",
        teacher: "Ethan Brown",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2070&auto=format&fit=crop",
        rating: 4.7,
        category: "Development",
        isFree: true,
        overview: "Accelerate your frontend development journey with HTML, CSS, and JavaScript fundamentals.",
        lectures: [
            {
                id: "2-1",
                title: "HTML & Accessibility",
                durationMin: 26,
                chapters: [
                    { id: "2-1-1", name: "Semantic HTML", topic: "Structure & a11y basics", durationMin: 12, videoUrl: "https://youtu.be/6BrpMJeZuvQ" }
                ]
            }
        ]
    },
    {
        id: 3,
        name: "Full Stack JavaScript",
        teacher: "Noah Johnson",
        image: "https://images.unsplash.com/photo-1454165833767-027ff39c137a?q=80&w=2070&auto=format&fit=crop",
        rating: 4.7,
        category: "Development",
        price: { original: 180, sale: 89 },
        overview: "Master full-stack JavaScript development with Node.js, Express, MongoDB, and React.",
        lectures: [
            {
                id: "3-1",
                title: "Node & NPM",
                durationMin: 36,
                chapters: [
                    { id: "3-1-1", name: "Node intro", topic: "Runtime", durationMin: 12, videoUrl: "https://youtu.be/TlB_eWDSMt4" }
                ]
            }
        ]
    },
    {
        id: 4,
        name: "UX/UI Design Pro",
        teacher: "Olivia Lee",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=2070&auto=format&fit=crop",
        rating: 4.9,
        category: "Design",
        price: { original: 250, sale: 125 },
        overview: "Transform into a professional UX/UI designer. Master design thinking and prototypes.",
        lectures: [
            {
                id: "4-1",
                title: "Design Principles",
                durationMin: 34,
                chapters: [
                    { id: "4-1-1", name: "Principles", topic: "Contrast", durationMin: 12, videoUrl: "https://youtu.be/QKxTMgdsaZU" }
                ]
            }
        ]
    },
    {
        id: 5,
        name: "Next.js Deep Dive",
        teacher: "Liam Smith",
        image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=2070&auto=format&fit=crop",
        rating: 4.6,
        category: "Development",
        isFree: true,
        overview: "Master Next.js framework with server-side rendering and static site generation.",
        lectures: [
            {
                id: "5-1",
                title: "Next.js Basics",
                durationMin: 28,
                chapters: [
                    { id: "5-1-1", name: "Pages & routing", topic: "Routes", durationMin: 10, videoUrl: "https://youtu.be/mTz0GXj8NN0" }
                ]
            }
        ]
    },
    {
        id: 6,
        name: "Python for Data Science",
        teacher: "Isabella Brown",
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=2070&auto=format&fit=crop",
        rating: 4.5,
        category: "Data Science",
        isFree: true,
        overview: "Start your data science journey with Python. Learn pandas and visualization.",
        lectures: [
            {
                id: "6-1",
                title: "Python Fundamentals",
                durationMin: 42,
                chapters: [
                    { id: "6-1-1", name: "Syntax", topic: "Types", durationMin: 16, videoUrl: "https://youtu.be/O6dlFgal1Lg" }
                ]
            }
        ]
    },
    {
        id: 7,
        name: "Data Science (Advance)",
        teacher: "Isabella Brown",
        image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1000",
        rating: 4.5,
        category: "Data Science",
        price: { original: 190, sale: 95 },
        overview: "Advanced data science techniques including machine learning and model deployment.",
        lectures: [
            {
                id: "7-1",
                title: "Advanced pandas",
                durationMin: 38,
                chapters: [
                    { id: "7-1-1", name: "Performance", topic: "Memory", durationMin: 12, videoUrl: "https://youtu.be/ZuHMuvIo7P4" }
                ]
            }
        ]
    },
    {
        id: 8,
        name: "JavaScript (Alternate)",
        teacher: "Noah Johnson",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
        rating: 4.7,
        category: "Development",
        price: { original: 180, sale: 89 },
        overview: "Alternative fullstack curriculum focusing on enterprise-level architecture.",
        lectures: [
            {
                id: "8-1",
                title: "Modern Frontend",
                durationMin: 48,
                chapters: [
                    { id: "8-1-1", name: "React patterns", topic: "Hooks", durationMin: 18, videoUrl: "https://youtu.be/48iVEbvT7u4" }
                ]
            }
        ]
    },
    {
        id: 9,
        name: "Cloud Computing Basics",
        teacher: "David Kim",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop",
        rating: 4.6,
        category: "Cloud",
        price: { original: 189, sale: 109 },
        overview: "Master cloud computing fundamentals with AWS, Azure, and Google Cloud.",
        lectures: [
            {
                id: "9-1",
                title: "Cloud Intro",
                durationMin: 35,
                chapters: [
                    { id: "9-1-1", name: "Core concepts", topic: "PaaS/IaaS", durationMin: 15, videoUrl: "https://youtu.be/sDoiClRyV_c" }
                ]
            }
        ]
    },
    {
        id: 10,
        name: "Web Development Pro",
        teacher: "John Smith",
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2070&auto=format&fit=crop",
        rating: 4.8,
        category: "Development",
        isFree: true,
        overview: "Complete web development course covering HTML, CSS, JavaScript, and modern deployment.",
        lectures: [
            {
                id: "10-1",
                title: "HTML & Semantics",
                durationMin: 25,
                chapters: [
                    { id: "10-1-1", name: "Basics", topic: "Tags", durationMin: 10, videoUrl: "https://youtu.be/4eGJp3LBLIA" }
                ]
            }
        ]
    },
    {
        id: 11,
        name: "Advanced JS Patterns",
        teacher: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2070&auto=format&fit=crop",
        rating: 4.9,
        category: "Development",
        price: { original: 149, sale: 79 },
        overview: "Deep dive into modern JavaScript features, patterns, and best practices.",
        lectures: [
            {
                id: "11-1",
                title: "Modern JS",
                durationMin: 35,
                chapters: [
                    { id: "11-1-1", name: "ES6+", topic: "Arrow functions", durationMin: 12, videoUrl: "https://youtu.be/JGwfuuyJX5E" }
                ]
            }
        ]
    },
    {
        id: 12,
        name: "UX Implementation",
        teacher: "Mike Chen",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?q=80&w=1000",
        rating: 4.7,
        category: "Design",
        isFree: true,
        overview: "Comprehensive UI/UX design course covering user research and design systems.",
        lectures: [
            {
                id: "12-1",
                title: "Design Setup",
                durationMin: 30,
                chapters: [
                    { id: "12-1-1", name: "Typography", topic: "Pairing", durationMin: 10, videoUrl: "https://youtu.be/_EiO98jSAb8" }
                ]
            }
        ]
    },
    {
        id: 13,
        name: "Data Analytics",
        teacher: "Dr. Emily Wilson",
        image: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=1000",
        rating: 4.6,
        category: "Data Science",
        price: { original: 229, sale: 129 },
        overview: "Introduction to data analytics with Python. Learn pandas and statistical analysis.",
        lectures: [
            {
                id: "13-1",
                title: "Python Analysis",
                durationMin: 40,
                chapters: [
                    { id: "13-1-1", name: "Visuals", topic: "Seaborn", durationMin: 20, videoUrl: "https://youtu.be/Fm_wxwEChCk" }
                ]
            }
        ]
    },
    {
        id: 14,
        name: "Mobile App Mastery",
        teacher: "Alex Rodriguez",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop",
        rating: 4.8,
        category: "Development",
        price: { original: 169, sale: 99 },
        overview: "Build cross-platform mobile applications with React Native from a single codebase.",
        lectures: [
            {
                id: "14-1",
                title: "Mobile Tools",
                durationMin: 20,
                chapters: [
                    { id: "14-1-1", name: "React Native", topic: "Hooks", durationMin: 10, videoUrl: "https://youtu.be/4eGJp3LBLIA" }
                ]
            }
        ]
    },
    {
        id: 15,
        name: "Machine Learning intro",
        teacher: "Dr. James Brown",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2070&auto=format&fit=crop",
        rating: 4.9,
        category: "AI/ML",
        isFree: true,
        overview: "Comprehensive machine learning course covering supervised and unsupervised learning.",
        lectures: [
            {
                id: "15-1",
                title: "ML Fundamentals",
                durationMin: 45,
                chapters: [
                    { id: "15-1-1", name: "Models", topic: "Regression", durationMin: 20, videoUrl: "https://youtu.be/sDoiClRyV_c" }
                ]
            }
        ]
    },
    {
        id: 16,
        name: "Marketing Masterclass",
        teacher: "Lisa Wang",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
        rating: 4.5,
        category: "Marketing",
        price: { original: 139, sale: 69 },
        overview: "Master digital marketing strategies including SEO and social media marketing.",
        lectures: [
            {
                id: "16-1",
                title: "Digital Strategy",
                durationMin: 28,
                chapters: [
                    { id: "16-1-1", name: "SEO Basics", topic: "Content", durationMin: 14, videoUrl: "https://youtu.be/JGwfuuyJX5E" }
                ]
            }
        ]
    },
    {
        id: 17,
        name: "Graphic Design Master",
        teacher: "Robert Taylor",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2070&auto=format&fit=crop",
        rating: 4.7,
        category: "Design",
        price: { original: 159, sale: 89 },
        overview: "Complete graphic design course covering Adobe Creative Suite and design principles.",
        lectures: [
            {
                id: "17-1",
                title: "Creative Tools",
                durationMin: 35,
                chapters: [
                    { id: "17-1-1", name: "Photoshop", topic: "Layers", durationMin: 18, videoUrl: "https://youtu.be/_EiO98jSAb8" }
                ]
            }
        ]
    },
    {
        id: 18,
        name: "Python Essentials",
        teacher: "Maria Garcia",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
        rating: 4.8,
        category: "Development",
        isFree: true,
        overview: "Learn Python programming from scratch. Master syntax and data structures.",
        lectures: [
            {
                id: "18-1",
                title: "Python Intro",
                durationMin: 40,
                chapters: [
                    { id: "18-1-1", name: "Types", topic: "Variables", durationMin: 20, videoUrl: "https://youtu.be/Fm_wxwEChCk" }
                ]
            }
        ]
    },
    {
        id: 19,
        name: "Infrastructure Cloud",
        teacher: "David Kim",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        rating: 4.6,
        category: "Cloud",
        price: { original: 189, sale: 109 },
        overview: "Master infrastructure as code, containerization, and cloud security with AWS.",
        lectures: [
            {
                id: "19-1",
                title: "Cloud Ops",
                durationMin: 35,
                chapters: [
                    { id: "19-1-1", name: "Storage", topic: "S3", durationMin: 15, videoUrl: "https://youtu.be/4eGJp3LBLIA" }
                ]
            }
        ]
    },
    {
        id: 20,
        name: "Security Essentials",
        teacher: "Amanda Lee",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        rating: 4.9,
        category: "Security",
        price: { original: 199, sale: 119 },
        overview: "Comprehensive cybersecurity course covering threat detection and network security.",
        lectures: [
            {
                id: "20-1",
                title: "Security Ops",
                durationMin: 30,
                chapters: [
                    { id: "20-1-1", name: "Threats", topic: "Phishing", durationMin: 15, videoUrl: "https://youtu.be/sDoiClRyV_c" }
                ]
            }
        ]
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing courses
        await CourseModel.deleteMany({});
        console.log('Old courses cleared.');

        // Insert new dummy courses
        await CourseModel.insertMany(dummyCourses);
        console.log('Seeded database with 20 dummy courses.');

        mongoose.connection.close();
        console.log('Connection closed.');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedDB();
