const FILES = {
  "BCA-101": {
    notes: [
      { title: "Chapter 1 - Introduction to Functions",     file: "pdfs/BCA-101/notes/Introduction to Functions.pdf", date: "June 02, 2026" },
      { title: "Chapter 2 - Introduction to Array",                file: "pdfs/BCA-101/notes/Introduction to Array.pdf", date: "June 02, 2026"  },
      { title: "Chapter 6-Control-Structure",         file: "pdfs/BCA-101/notes/Chapter 6-Control-Structure.pdf", date: "June 02, 2026"  },
    ],
    questionPapers: [
      { title: "2022 Final Exam Paper", file: "pdfs/BCA-101/question-papers/2022-Final.pdf", date: "Nov 01, 2023" },
    ],
    labReports: []
  },
  "BCA-102": {
    notes: [
      { title: "Chapter 1 - Introduction to Functions", file: "pdfs/BCA-101/notes/Introduction-to-Functions.pdf", date: "June 02, 2026" },
      { title: "Chapter 2 - Introduction to Array", file: "pdfs/BCA-101/notes/Introduction to Array.pdf", date: "June 02, 2026"  },
      { title: "Chapter 6-Control-Structure",file: "pdfs/BCA-101/notes/Chapter 6-Control-Structure.pdf", date: "June 02, 2026"  },
    ],
    questionPapers: [
      { title: "2022 Final Exam Paper", file: "pdfs/BCA-102/question-papers/2022-Final.pdf", date: "Nov 10, 2023" },
      { title: "2023 Mid Term Paper",   file: "pdfs/BCA-102/question-papers/2023-Mid.pdf",   date: "Nov 15, 2023" },
    ],
    labReports: [
      { title: "Lab 1 - Hello World & Basic I/O", file: "pdfs/BCA-102/lab-reports/Lab-1.pdf", date: "Oct 20, 2023" },
      { title: "Lab 2 - Loops and Conditions",    file: "pdfs/BCA-102/lab-reports/Lab-2.pdf", date: "Oct 28, 2023" },
    ]
  },
  "BCA-103": {
    notes: [
      { title: "Chapter 1 - Boolean Algebra", file: "pdfs/BCA-103/notes/Chapter-1.pdf", date: "Nov 01, 2023" },
      { title: "Chapter 2 - Logic Gates",     file: "pdfs/BCA-103/notes/Chapter-2.pdf", date: "Nov 08, 2023" },
    ],
    questionPapers: [],
    labReports: []
  },
  "BCA-104": {
    notes: [
      { title: "Chapter 1 - Sets and Functions", file: "pdfs/BCA-104/notes/Chapter-1.pdf", date: "Nov 05, 2023" },
    ],
    questionPapers: [
      { title: "2023 Final Exam Paper", file: "pdfs/BCA-104/question-papers/2023-Final.pdf", date: "Nov 20, 2023" },
    ],
    labReports: []
  },
  "BCA-105": {
    notes: [
      { title: "Unit 1 - Professional Writing",  file: "pdfs/BCA-105/notes/Unit-1.pdf", date: "Nov 10, 2023" },
      { title: "Unit 2 - Presentation Skills",   file: "pdfs/BCA-105/notes/Unit-2.pdf", date: "Nov 18, 2023" },
    ],
    questionPapers: [],
    labReports: []
  },
  "BCA-106": {
    notes: [],
    questionPapers: [],
    labReports: [
      { title: "Lab 1 - Computer Assembly",       file: "pdfs/BCA-106/lab-reports/Lab-1.pdf", date: "Nov 20, 2023" },
      { title: "Lab 2 - Motherboard Components",  file: "pdfs/BCA-106/lab-reports/Lab-2.pdf", date: "Nov 28, 2023" },
    ]
  },
  "BCA-151": {
    notes: [
      { title: "Chapter 1 - Sets and Relations",   file: "pdfs/BCA-151/notes/Chapter-1.pdf", date: "Jan 08, 2024" },
      { title: "Chapter 2 - Graph Theory",         file: "pdfs/BCA-151/notes/Chapter-2.pdf", date: "Jan 15, 2024" },
      { title: "Chapter 3 - Propositional Logic",  file: "pdfs/BCA-151/notes/Chapter-3.pdf", date: "Jan 22, 2024" },
    ],
    questionPapers: [
      { title: "2022 Final Exam Paper", file: "pdfs/BCA-151/question-papers/2022-Final.pdf", date: "Jan 25, 2024" },
      { title: "2023 Final Exam Paper", file: "pdfs/BCA-151/question-papers/2023-Final.pdf", date: "Feb 01, 2024" },
    ],
    labReports: []
  },
  "BCA-152": {
    notes: [
      { title: "Unit 1 - 8085 Architecture", file: "pdfs/BCA-152/notes/Unit-1.pdf", date: "Jan 12, 2024" },
      { title: "Unit 2 - Instruction Set",   file: "pdfs/BCA-152/notes/Unit-2.pdf", date: "Jan 20, 2024" },
    ],
    questionPapers: [],
    labReports: [
      { title: "Lab 1 - 8085 Programs", file: "pdfs/BCA-152/lab-reports/Lab-1.pdf", date: "Jan 18, 2024" },
    ]
  },
  "BCA-153": {
    notes: [
      { title: "Chapter 1 - OOP Concepts",      file: "pdfs/BCA-153/notes/Chapter-1.pdf", date: "Jan 18, 2024" },
      { title: "Chapter 2 - Classes and Objects",file: "pdfs/BCA-153/notes/Chapter-2.pdf", date: "Jan 26, 2024" },
      { title: "Chapter 3 - Inheritance",        file: "pdfs/BCA-153/notes/Chapter-3.pdf", date: "Feb 02, 2024" },
    ],
    questionPapers: [
      { title: "2023 Mid Term Paper", file: "pdfs/BCA-153/question-papers/2023-Mid.pdf", date: "Feb 05, 2024" },
    ],
    labReports: [
      { title: "Lab 1 - Basic Java Programs",  file: "pdfs/BCA-153/lab-reports/Lab-1.pdf", date: "Jan 25, 2024" },
      { title: "Lab 2 - Inheritance Programs", file: "pdfs/BCA-153/lab-reports/Lab-2.pdf", date: "Feb 03, 2024" },
    ]
  },
  "BCA-154": { notes: [], questionPapers: [], labReports: [] },
  "BCA-155": { notes: [], questionPapers: [], labReports: [] },
  "BCA-156": { notes: [], questionPapers: [], labReports: [] },
  "BCA-201": { notes: [], questionPapers: [], labReports: [] },
  "BCA-202": { notes: [], questionPapers: [], labReports: [] },
  "BCA-203": { notes: [], questionPapers: [], labReports: [] },
  "BCA-204": { notes: [], questionPapers: [], labReports: [] },
  "BCA-205": { notes: [], questionPapers: [], labReports: [] },
  "BCA-206": { notes: [], questionPapers: [], labReports: [] },
  "BCA-251": { notes: [], questionPapers: [], labReports: [] },
  "BCA-252": { notes: [], questionPapers: [], labReports: [] },
  "BCA-253": { notes: [], questionPapers: [], labReports: [] },
  "BCA-254": { notes: [], questionPapers: [], labReports: [] },
  "BCA-255": { notes: [], questionPapers: [], labReports: [] },
  "BCA-256": { notes: [], questionPapers: [], labReports: [] },
  "BCA-301": { notes: [], questionPapers: [], labReports: [] },
  "BCA-302": { notes: [], questionPapers: [], labReports: [] },
  "BCA-303": { notes: [], questionPapers: [], labReports: [] },
  "BCA-304": { notes: [], questionPapers: [], labReports: [] },
  "BCA-305": { notes: [], questionPapers: [], labReports: [] },
  "BCA-306": { notes: [], questionPapers: [], labReports: [] },
};
