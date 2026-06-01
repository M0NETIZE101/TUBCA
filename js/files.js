const FILES = {
  "BCA-101": {
    notes: [
      { title: "Chapter 1 - Introduction to Functions",     file: "pdfs/BCA-101/notes/Introduction to Functions.pdf" },
      { title: "Chapter 2 - Introduction to Array",                file: "pdfs/BCA-101/notes/Introduction to Array.pdf" },
      { title: "Chapter 6-Control-Structure",         file: "pdfs/BCA-101/notes/Chapter 6-Control-Structure.pdf" },
    ],
    questionPapers: [
      { title: "2022 Final Exam Paper",                     file: "pdfs/BCA-101/question-papers/2022-Final.pdf" },
      { title: "2023 Final Exam Paper",                     file: "pdfs/BCA-101/question-papers/2023-Final.pdf" },
    ],
    labReports: []
  },

  "BCA-102": {
    notes: [
      { title: "Chapter 1 - Introduction to C",             file: "pdfs/BCA-102/notes/Chapter-1-Intro-C.pdf" },
      { title: "Chapter 2 - Data Types and Operators",      file: "pdfs/BCA-102/notes/Chapter-2-DataTypes.pdf" },
      { title: "Chapter 3 - Control Structures",            file: "pdfs/BCA-102/notes/Chapter-3-Control.pdf" },
      { title: "Chapter 4 - Functions and Arrays",          file: "pdfs/BCA-102/notes/Chapter-4-Functions.pdf" },
    ],
    questionPapers: [
      { title: "2023 Mid Term Paper",                       file: "pdfs/BCA-102/question-papers/2023-MidTerm.pdf" },
    ],
    labReports: [
      { title: "Lab 1 - Hello World & Basic I/O",           file: "pdfs/BCA-102/lab-reports/Lab-1.pdf" },
      { title: "Lab 2 - Loops and Conditions",              file: "pdfs/BCA-102/lab-reports/Lab-2.pdf" },
    ]
  },

  "BCA-103": {
    notes: [
      { title: "Chapter 1 - Boolean Algebra",               file: "pdfs/BCA-103/notes/Chapter-1-Boolean.pdf" },
      { title: "Chapter 2 - Logic Gates",                   file: "pdfs/BCA-103/notes/Chapter-2-Gates.pdf" },
    ],
    questionPapers: [],
    labReports: []
  },

  "BCA-104": {
    notes: [
      { title: "Chapter 1 - Sets and Functions",            file: "pdfs/BCA-104/notes/Chapter-1-Sets.pdf" },
    ],
    questionPapers: [
      { title: "2022 Final Exam Paper",                     file: "pdfs/BCA-104/question-papers/2022-Final.pdf" },
    ],
    labReports: []
  },

  "BCA-105": {
    notes: [
      { title: "Unit 1 - Professional Writing",             file: "pdfs/BCA-105/notes/Unit-1-Writing.pdf" },
      { title: "Unit 2 - Presentation Skills",              file: "pdfs/BCA-105/notes/Unit-2-Presentation.pdf" },
    ],
    questionPapers: [],
    labReports: []
  },

  "BCA-106": {
    notes: [],
    questionPapers: [],
    labReports: [
      { title: "Lab 1 - Hardware Components",               file: "pdfs/BCA-106/lab-reports/Lab-1.pdf" },
      { title: "Lab 2 - Motherboard Assembly",              file: "pdfs/BCA-106/lab-reports/Lab-2.pdf" },
    ]
  },

  "BCA-151": {
    notes: [
      { title: "Chapter 1 - Sets and Relations",            file: "pdfs/BCA-151/notes/Chapter-1-Sets.pdf" },
      { title: "Chapter 2 - Graph Theory",                  file: "pdfs/BCA-151/notes/Chapter-2-Graphs.pdf" },
      { title: "Chapter 3 - Propositional Logic",           file: "pdfs/BCA-151/notes/Chapter-3-Logic.pdf" },
      { title: "Mid Term Revision Notes",                   file: "pdfs/BCA-151/notes/MidTerm-Revision.pdf" },
    ],
    questionPapers: [
      { title: "2022 Final Exam Paper",                     file: "pdfs/BCA-151/question-papers/2022-Final.pdf" },
      { title: "2023 Final Exam Paper",                     file: "pdfs/BCA-151/question-papers/2023-Final.pdf" },
      { title: "2023 Mid Term Paper",                       file: "pdfs/BCA-151/question-papers/2023-MidTerm.pdf" },
    ],
    labReports: []
  },

  "BCA-152": {
    notes: [
      { title: "Chapter 1 - 8085 Architecture",             file: "pdfs/BCA-152/notes/Chapter-1-8085.pdf" },
      { title: "Chapter 2 - Instruction Set",               file: "pdfs/BCA-152/notes/Chapter-2-Instructions.pdf" },
    ],
    questionPapers: [],
    labReports: [
      { title: "Lab 1 - 8085 Programs",                     file: "pdfs/BCA-152/lab-reports/Lab-1.pdf" },
    ]
  },

  "BCA-153": {
    notes: [
      { title: "Chapter 1 - OOP Concepts",                  file: "pdfs/BCA-153/notes/Chapter-1-OOP.pdf" },
      { title: "Chapter 2 - Classes and Objects",           file: "pdfs/BCA-153/notes/Chapter-2-Classes.pdf" },
      { title: "Chapter 3 - Inheritance",                   file: "pdfs/BCA-153/notes/Chapter-3-Inheritance.pdf" },
    ],
    questionPapers: [
      { title: "2023 Final Exam Paper",                     file: "pdfs/BCA-153/question-papers/2023-Final.pdf" },
    ],
    labReports: [
      { title: "Lab 1 - Basic Java Programs",               file: "pdfs/BCA-153/lab-reports/Lab-1.pdf" },
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

/*
  HOW TO ADD A NEW PDF:
  1. Put your PDF file in the correct folder:
       pdfs/BCA-XXX/notes/
       pdfs/BCA-XXX/question-papers/
       pdfs/BCA-XXX/lab-reports/

  2. Add one entry to the matching array above:
       { title: "Your PDF Title", file: "pdfs/BCA-XXX/notes/your-file.pdf" }

  That's it — no other files need to be changed.
*/
