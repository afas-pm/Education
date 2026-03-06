import MathImg from "../assets/Complete Mathematics for JEE Main & Advanced.png";
import PhysicsImg from "../assets/CBSE Class 12 Physics Complete Course.png";
import UPSCImg from "../assets/UPSC Prelims & Mains Strategy 2024.png";
import SSCImg from "../assets/SSC CGL Complete Preparation.png";

export const dummyCourses = [
    {
        id: "math-10-cbse",
        name: "Complete Mathematics for Class 10 CBSE",
        teacher: "Dr. Rajesh Kumar",
        image: MathImg,
        level: "Advanced",
        category: "School Tuition",
        rating: 4.8,
        ratingCount: "12,500",
        duration: "6 months",
        lessons: "180 lessons",
        price: { sale: 2999, original: 8999 },
        discount: "44% OFF",
        isPopular: true,
        overview: "Master Class 10 CBSE Mathematics with our comprehensive course covering Algebra, Geometry, Trigonometry, and more. Designed for high-scoring results.",
        learningOutcomes: [
            "Complete mastery of NCERT curriculum",
            "Advanced problem-solving techniques",
            "Regular mock tests and previous year papers",
            "Doubt clearing sessions with experts"
        ],
        lectures: [
            {
                id: "lec-1",
                title: "Algebra Mastery",
                durationMin: 120,
                chapters: [
                    { id: "ch-1", name: "Polynomials Deep Dive", topic: "Basics of Polynomials", durationMin: 45, videoUrl: "dQw4w9WgXcQ" },
                    { id: "ch-2", name: "Quadratic Equations", topic: "Solving Quadratic Equations", durationMin: 75, videoUrl: "dQw4w9WgXcQ" }
                ]
            },
            {
                id: "lec-2",
                title: "Geometry Focus",
                durationMin: 90,
                chapters: [
                    { id: "ch-3", name: "Triangles & Theorems", topic: "Similar Triangles", durationMin: 90, videoUrl: "dQw4w9WgXcQ" }
                ]
            }
        ]
    },
    {
        id: "physics-12-cbse",
        name: "CBSE Class 12 Physics Complete Course",
        teacher: "Prof. Meera Sharma",
        image: PhysicsImg,
        level: "Intermediate",
        category: "School Tuition",
        rating: 4.7,
        ratingCount: "8,900",
        duration: "4 months",
        lessons: "120 lessons",
        price: { sale: 2999, original: 4999 },
        discount: "40% OFF",
        isPopular: false,
        overview: "Comprehensive Physics course for Class 12 CBSE students. Focus on Electrostatics, Optics, and Modern Physics with practical applications.",
        learningOutcomes: [
            "In-depth understanding of complex Physics concepts",
            "Numerical problem-solving expertise",
            "Lab experiment simulations and theories",
            "Board exam strategy and time management"
        ],
        lectures: [
            {
                id: "lec-p1",
                title: "Electrostatics",
                durationMin: 60,
                chapters: [
                    { id: "ch-p1", name: "Electric Charges & Fields", topic: "Coulomb's Law", durationMin: 60, videoUrl: "dQw4w9WgXcQ" }
                ]
            }
        ]
    },
    {
        id: "upsc-2024",
        name: "UPSC Prelims & Mains Strategy 2024",
        teacher: "IAS Priya Joshi",
        image: UPSCImg,
        level: "Expert",
        category: "Competitive Exams",
        rating: 4.9,
        ratingCount: "15,600",
        duration: "12 months",
        lessons: "300 lessons",
        price: { sale: 7999, original: 12999 },
        discount: "38% OFF",
        isPopular: true
    },
    {
        id: "ssc-cgl-prep",
        name: "SSC CGL Complete Preparation",
        teacher: "Amit Verma",
        image: SSCImg,
        level: "Intermediate",
        category: "Competitive Exams",
        rating: 4.6,
        ratingCount: "6,700",
        duration: "5 months",
        lessons: "150 lessons",
        price: { sale: 3499, original: 5999 },
        discount: "42% OFF",
        isPopular: false
    },
    {
        id: "chem-11-icse",
        name: "Organic Chemistry Masterclass - Class 11",
        teacher: "Dr. Sanjay Gupta",
        image: "/organic-chem.png",
        level: "Intermediate",
        category: "School Tuition",
        rating: 4.5,
        ratingCount: "4,200",
        duration: "5 months",
        lessons: "140 lessons",
        price: { sale: 2499, original: 4499 },
        discount: "45% OFF",
        isPopular: false
    },
    {
        id: "bio-neet-prep",
        name: "NEET Biology Crack Course 2024",
        teacher: "Dr. Anjali Menon",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
        level: "Expert",
        category: "Entrance Coaching",
        rating: 4.8,
        ratingCount: "9,100",
        duration: "8 months",
        lessons: "220 lessons",
        price: { sale: 4999, original: 9999 },
        discount: "50% OFF",
        isPopular: true
    },
    {
        id: "english-speaking",
        name: "Advanced English Communication Skills",
        teacher: "Sarah Thompson",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
        level: "Beginner",
        category: "Skill Development",
        rating: 4.7,
        ratingCount: "3,500",
        duration: "3 months",
        lessons: "60 lessons",
        price: { sale: 1999, original: 3999 },
        discount: "50% OFF",
        isPopular: false
    },
    {
        id: "web-dev-full",
        name: "Full Stack Web Development (MERN)",
        teacher: "Vikram Malhotra",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop",
        level: "Intermediate",
        category: "Skill Development",
        rating: 4.9,
        ratingCount: "7,800",
        duration: "6 months",
        lessons: "250 lessons",
        price: { sale: 8999, original: 15999 },
        discount: "44% OFF",
        isPopular: true
    }
];
