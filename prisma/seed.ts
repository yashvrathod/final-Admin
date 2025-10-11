import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const bookChapters = [
  {
    year: "2025",
    chapterTitle: "Impacts of Digital Technologies Across Generations",
    bookTitle:
      "Bridging Academia and Industry Through Cloud Integration in Education",
    doi: "10.4018/979-8-3693-6705-6.ch001",
    doiLink: "https://doi.org/10.4018/979-8-3693-6705-6.ch001",
    isbn: "9798369367070, 9798369367056",
    coAuthors: "K.P. Kshirsagar; A. Ingle",
    scopusLink:
      "https://www.scopus.com/record/display.uri?eid=2-s2.0-85218055676",
    crossrefLink: "",
  },
  {
    year: "2025",
    chapterTitle:
      "Human-centric IT Management: Enhancing Employee Productivity and Satisfaction",
    bookTitle:
      "Tech-Driven Strategies: Leveraging Information Technology in Business Management",
    doi: "— (no Crossref DOI listed yet)",
    doiLink: "",
    isbn: "9798895303986, 9798895302606",
    coAuthors: "O. Bagaria; S. Mohammed; R. Kamalraj; A. Ingle",
    scopusLink: "https://www.scopus.com/pages/publications/86000193063",
    crossrefLink: "",
  },
  {
    year: "2025",
    chapterTitle:
      "Empowering Individuals with Disabilities: The Role of Mobile Health Apps in Enhancing Accessibility and Health Outcomes",
    bookTitle:
      "Modern Digital Approaches to Care Technologies for Individuals with Disabilities",
    doi: "10.4018/979-8-3693-7560-0.ch004",
    doiLink: "https://doi.org/10.4018/979-8-3693-7560-0.ch004",
    isbn: "9798369375600, 9798369375624",
    coAuthors: "A.W. Ingle; K.P. Kshirsagar; P.G. Gawande",
    scopusLink: "https://www.scopus.com/pages/publications/105005127645",
    crossrefLink: "https://doi.org/10.4018/979-8-3693-7560-0.ch004",
  },
];

async function main() {
  for (let i = 0; i < bookChapters.length; i++) {
    const chapter = bookChapters[i];
    await prisma.bookChapter.create({
      data: {
        year: chapter.year,
        chapterTitle: chapter.chapterTitle,
        bookTitle: chapter.bookTitle,
        doi: chapter.doi,
        doiLink: chapter.doiLink,
        isbn: chapter.isbn,
        coAuthors: chapter.coAuthors,
        scopusLink: chapter.scopusLink,
        crossrefLink: chapter.crossrefLink,
        order: i + 1,
      },
    });
  }

  console.log("All book chapters seeded successfully!");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
