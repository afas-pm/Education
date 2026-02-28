export const testStats = [
    { label: "Tests Taken", value: "25", color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Questions Solved", value: "850", color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Average Score", value: "82%", color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Practice Time", value: "45h", color: "text-orange-600", bg: "bg-orange-50" },
];

export const availableTests = [
    {
        id: "neet-2024",
        title: "NEET Mock Test 2024 - Biology",
        difficulty: "High",
        questions: 180,
        duration: "3 hours",
        attempts: 1250,
        rating: 4.8
    },
    {
        id: "jee-main-physics",
        title: "JEE Main Physics Practice",
        difficulty: "Medium",
        questions: 90,
        duration: "3 hours",
        attempts: 2100,
        rating: 4.6
    },
    {
        id: "plus-two-bio",
        title: "Plus Two Bio science",
        difficulty: "Medium",
        questions: 50,
        duration: "2 hours",
        attempts: 890,
        rating: 4.7
    }
];

export const examQuestions = [
    {
        id: 1,
        question: "Which organelle is known as the powerhouse of the cell?",
        options: [
            { id: 'A', text: "Nucleus" },
            { id: 'B', text: "Mitochondria" },
            { id: 'C', text: "Ribosome" },
            { id: 'D', text: "Golgi apparatus" }
        ],
        subject: "physics",
        correctAnswer: "B",
        userAnswer: "B",
        marks: 4,
        explanation: "Mitochondria are known as the powerhouse of the cell because they generate most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
    },
    {
        id: 2,
        question: "What is the function of ribosomes?",
        options: [
            { id: 'A', text: "DNA replication" },
            { id: 'B', text: "Protein synthesis" },
            { id: 'C', text: "Lipid synthesis" },
            { id: 'D', text: "ATP production" }
        ],
        subject: "physics",
        correctAnswer: "B",
        userAnswer: "B",
        marks: 4,
        explanation: "Ribosomes are the sites in a cell in which protein synthesis takes place."
    },
    {
        id: 3,
        question: "Which process occurs in the chloroplasts?",
        options: [
            { id: 'A', text: "Respiration" },
            { id: 'B', text: "Photosynthesis" },
            { id: 'C', text: "Fermentation" },
            { id: 'D', text: "Glycolysis" }
        ],
        subject: "physics",
        correctAnswer: "B",
        userAnswer: "A",
        marks: 4,
        explanation: "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct."
    }
];

export const mockResults = {
    examName: "Physics Model Exam",
    completedDate: "1/15/2025",
    totalScore: 4,
    totalQuestions: 5,
    percentage: 80,
    rank: 234,
    totalStudents: 1250,
    timeTaken: "52m",
    totalTime: "60m",
    analysis: {
        correct: 4,
        incorrect: 7, // Based on image
        skipped: 3
    },
    topicPerformance: [
        { topic: "Cell Biology", percentage: 87.5, score: "7/8" },
        { topic: "Genetics", percentage: 80, score: "8/10" },
        { topic: "Ecology", percentage: 71.4, score: "5/7" },
        { topic: "Plant Physiology", percentage: 75, score: "9/12" },
        { topic: "Human Physiology", percentage: 75, score: "6/8" }
    ],
    comparison: {
        yourScore: 80,
        averageScore: 65.4,
        topScore: 94.2,
        percentile: 88
    }
};
