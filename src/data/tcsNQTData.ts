
export const tcsNQTData = {
    testFeatures: [
        "Exam is conducted in TCS iON Centers (in‑person)",
        "TCS NQT is an integrated test with two sections: Foundation Section & Advanced Section",
        "Everyone can attempt both sections",
        "Advanced Section is mandatory for Digital & Prime offers",
        "Shortlisting for Ninja, Digital, & Prime interviews based on performance",
    ],
    testPattern: {
        foundation: {
            duration: 75,
            sections: [
                { name: "Numerical Ability", duration: 25 },
                { name: "Verbal Ability", duration: 25 },
                { name: "Reasoning Ability", duration: 25 },
            ],
        },
        advanced: {
            duration: 115,
            sections: [
                { name: "Advanced Quantitative & Reasoning", duration: 25 },
                { name: "Advanced Coding", duration: 90 },
            ],
        },
        totalDuration: 190,
    },
    sectionStrategies: [
        {
            id: "numerical",
            title: "Numerical Ability (Foundation)",
            duration: "25 mins",
            topics: [
                "Percentages",
                "Ratio & Proportion",
                "Profit & Loss",
                "Time & Work",
                "Time, Speed & Distance",
                "Averages",
                "Mixtures",
                "Number System basics",
            ],
            feel: [
                "Direct formula based",
                "Moderate calculation",
                "Speed matters more than tricks",
            ],
            strategy: [
                "Memorize core formulas",
                "Practice mental math",
                "Solve topic-wise timed sets",
            ],
            resources: [
                {
                    title: "Complete Numerical Ability (YouTube) - 1",
                    url: "https://www.youtube.com/live/CXmeSTK4uHc?si=zhnP3FoodSovW1r5",
                },
                {
                    title: "Numerical Ability Playlist - 2",
                    url: "https://www.youtube.com/watch?v=S-Ji7aayH3A&list=PLMufDeLh5x2Aaig0ZieDTUsKSmvmz1RBN&index=1",
                },
                {
                    title: "Numerical Ability Playlist - 3",
                    url: "https://www.youtube.com/playlist?list=PLlh4IZvFoZFc330CQGtSOwy2IKlMU3MF9",
                },
                {
                    title: "Indiabix (Practice Daily)",
                    url: "https://www.indiabix.com/",
                },
            ],
        },
        {
            id: "verbal",
            title: "Verbal Ability (Foundation)",
            duration: "25 mins",
            topics: [
                "Reading Comprehension",
                "Error Detection",
                "Sentence Correction",
                "Para Jumbles",
                "Fill in the blanks",
                "Vocabulary basics",
            ],
            strategy: [
                "Easy Section, here you have to score",
                "Do RC at the end if lengthy",
                "Don’t overthink grammar — go by rule + ear",
                "Eliminate wrong options fast",
            ],
            resources: [
                {
                    title: "Verbal Ability Strategy",
                    url: "https://www.youtube.com/watch?v=GDAVuWg0G8M",
                },
                {
                    title: "Verbal Ability Playlist - 1",
                    url: "https://www.youtube.com/playlist?list=PLGFjgYQtw1UhMv8f7bursWjrat7430eig",
                },
                {
                    title: "Verbal Ability Playlist - 2",
                    url: "https://www.youtube.com/playlist?list=PLd5_GYDTZQDZOW4Z5MI2pmT1ZYsh2l7I9",
                },
                {
                    title: "Indiabix (Practice Speed Solving)",
                    url: "https://www.indiabix.com/",
                },
                {
                    title: "PrepInsta",
                    url: "https://prepinsta.com/",
                },
            ],
        },
        {
            id: "reasoning",
            title: "Reasoning Ability (Foundation)",
            duration: "25 mins",
            topics: [
                "Coding–Decoding",
                "Blood Relations",
                "Direction Sense",
                "Number & Letter Series",
                "Syllogisms",
                "Seating Arrangement (basic)",
                "Statement & Conclusion",
            ],
            strategy: [
                "Skip long seating puzzles if stuck",
                "Pattern questions are scoring",
            ],
            resources: [
                {
                    title: "Reasoning Strategy - 1",
                    url: "https://www.youtube.com/watch?v=sWJfscVkhLI",
                },
                {
                    title: "Reasoning Strategy - 2",
                    url: "https://www.youtube.com/watch?v=fwUh6tFw6iE",
                },
                {
                    title: "Indiabix",
                    url: "https://www.indiabix.com/",
                },
                {
                    title: "PrepInsta",
                    url: "https://prepinsta.com/",
                },
                {
                    title: "Testbook",
                    url: "https://testbook.com/",
                },
            ],
        },
        {
            id: "advanced_quant",
            title: "Advanced Quantitative & Reasoning",
            duration: "25 mins",
            level: "Higher than foundation",
            topics: [
                "Advanced percentages & algebra",
                "Data interpretation",
                "Logical caselets",
                "Advanced series & patterns",
                "Quant + logic mixed problems",
            ],
            strategy: [
                "Attempt easy ones first",
                "Don’t get trapped in long caselets",
                "Use approximation where possible",
            ],
            resources: [],
        },
        {
            id: "advanced_coding",
            title: "Advanced Coding",
            duration: "90 mins",
            format: [
                "Usually 3 coding questions",
                "Easy–Medium + Medium-Hard level",
                "Language choice allowed (Java/C++/Python etc.)",
            ],
            commonTypes: [
                "Arrays & Strings",
                "HashMap / frequency problems",
                "Sliding window/Two Pointer",
                "Sorting + searching",
                "Recursion",
                "Matrix traversal",
            ],
            exampleTypes: [
                "Longest subarray with given condition",
                "String transformation problems",
                "Count pairs with constraint",
            ],
            strategy: [
                "Read constraints carefully",
                "Clarify input/output format",
                "Test with custom cases",
            ],
            practicePlan: [
                "Practice Medium-Hard problems daily",
                "Target solving within 25–30 mins each",
                "Focus on clean code + edge cases",
            ],
            resources: [
                {
                    title: "Striver's A2Z DSA Sheet (Best for Logic)",
                    url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/",
                },
                {
                    title: "PrepInsta Top 100 Codes (Must Do)",
                    url: "https://prepinsta.com/top-100-codes/",
                },
                {
                    title: "GeeksforGeeks TCS NQT Coding Sheet",
                    url: "https://www.geeksforgeeks.org/tcs-nqt-coding-questions-and-answers/",
                },
                {
                    title: "Leetcode Top Interview Questions",
                    url: "https://leetcode.com/problem-list/top-interview-questions/",
                },
                {
                    title: "Advanced Coding Strategy Video",
                    url: "https://www.youtube.com/watch?v=96tQhfys7q0",
                },
                {
                    title: "Codeforces (Div3 A-C Practice)",
                    url: "https://codeforces.com/problemset?tags=800-1200",
                },
            ],
        },
    ],
    crashPlan: [
        { day: "1-4", focus: "Foundation Quant" },
        { day: "5-7", focus: "Verbal Ability" },
        { day: "8-10", focus: "Reasoning Ability" },
        { day: "11-14", focus: "Advanced Quant & Logic" },
        { day: "15-18", focus: "Coding Practice" },
        { day: "19-20", focus: "Full Mock + Revision" },
    ],
    interviewPrep: {
        tips: [
            "Prepare strong self‑introduction",
            "Be clear on resume projects",
            "Revise OOPS & DBMS basics",
            "Practice SQL queries",
            "Be ready for scenario questions",
        ],
        examples: [
            "Why should we hire you?",
            "Tell me about a project challenge",
            "How do you handle conflicts in a team?",
        ],
        resources: [
            {
                title: "Interview Prep - 1",
                url: "https://www.youtube.com/watch?v=EjvaBw73zRo",
            },
            {
                title: "Interview Prep - 2",
                url: "https://www.youtube.com/watch?v=Cprs0eFRrXI",
            },
            {
                title: "Interview Prep - 3",
                url: "https://www.youtube.com/watch?v=jezDCzRwvm8",
            },
            {
                title: "Interview Prep - 4",
                url: "https://www.youtube.com/watch?v=rtUz6s-It7k",
            },
        ],
    },
    previousYearQuestions: [
        {
            title: "TCS NQT 2024 Actual Questions (Shift 1)",
            url: "https://www.youtube.com/watch?v=actual_q_url_1",
            type: "Video Solution"
        },
        {
            title: "TCS NQT 2024 Actual Questions (Shift 2)",
            url: "https://www.youtube.com/watch?v=actual_q_url_2",
            type: "Video Solution"
        },
        {
            title: "TCS Digital Advanced Coding Questions - 2023",
            url: "https://prepinsta.com/tcs-digital/placement-papers/coding/",
            type: "Practice Site"
        },
        {
            title: "TCS NQT Past Year Verbal Ability Questions",
            url: "https://www.faceprep.in/tcs/tcs-nqt-verbal-ability-questions/",
            type: "Article / PDF"
        },
        {
            title: "TCS NQT 2023 - All Slots Quantification Questions",
            url: "https://www.youtube.com/watch?v=quant_q_url",
            type: "Video Playlist"
        }
    ],
    commonMistakes: [
        "Spending too long on one aptitude question",
        "Jumping into coding without reading constraints",
        "Ignoring edge cases",
        "Not managing time between sections",
        "Over-attempting and panicking",
    ],
};
