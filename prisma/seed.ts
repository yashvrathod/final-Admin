import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const internships = [
  {
    company: "Healthy Globe Smart Virtual Education Pvt. Ltd. (Padhega Bharat)",
    description: "05 Students (FYBTECH Students), Signed MOU",
    link: "https://www.linkedin.com/company/padhegabharat/?originalSubdomain=in",
  },
  {
    company: "Deep Learning Research & Development (DLRD)",
    description: "11 Students (FYBTECH/SYBTECH Students)",
    link: "",
  },
  {
    company: "PrepBytes, Ghaziabad",
    description:
      "Conducted Online workshop on Competitive Coding for FYBTECH Students",
    link: "https://www.prepbytes.com/",
  },
  {
    company: "PROGO",
    description: "01 Student (SYBTECH Student)",
    link: "",
  },
  {
    company: "Optimum Data Analytics (ODA), Pune",
    description:
      "Signed MOU, 20 Students (SYBTECH Students), Completed 4 Industrial Projects",
    link: "https://optimumdataanalytics.com/",
  },
  {
    company: "ASIC Networking Services Pvt. Ltd., Pune",
    description: "Signed MOU",
    link: "https://www.linkedin.com/company/asic-networking-services-pte-ltd/?originalSubdomain=in",
  },
  {
    company: "RIMOTE Private Limited, Singapore",
    description:
      "06 Students (Final Year), 02 Students (Third Year), Signed MOU",
    link: "",
  },
  {
    company: "Code Gurukul, Pune",
    description: "40+ Students (Final Year/SYBTECH/TYBTECH)",
    link: "https://www.linkedin.com/company/code-gurukul/",
  },
  {
    company: "OXVSYS, Pune",
    description: "02 Students",
    link: "https://oxvsys.com/",
  },
  {
    company: "INNOTEK IT SYSTEMS LLP",
    description: "40 Students (FYBTECH Students)",
    link: "https://innoteksystem.com/",
  },
  {
    company: "CREATOR RESEARCH Pvt. Ltd.",
    description: "04 Students (FYBTECH Students)",
    link: "https://creatorresearch.com/",
  },
  {
    company: "Intenics Private Limited, Jabalpur",
    description:
      "03 Students (FYBTECH Students), Product Development under Internship – 01 Student",
    link: "https://intenics.in/",
  },
];

const industryVisits = [
  { company: "Mag Power, Pune", link: "https://magpowerpune.com/" },
  {
    company: "Revogreen Technologies Pvt. Ltd., Pune",
    link: "https://revogreen.in/",
  },
  { company: "Halliburton, Pune", link: "https://www.halliburton.com/" },
  { company: "H. B. Fuller", link: "https://www.hbfuller.com/" },
  {
    company: "Intenics Private Limited, Jabalpur",
    link: "https://intenics.in/",
  },
];

async function main() {
  // Seed internships
  for (let i = 0; i < internships.length; i++) {
    const internship = internships[i];
    await prisma.corporateConnection.create({
      data: {
        company: internship.company,
        description: internship.description,
        logoUrl: internship.link || null,
        order: i + 1,
        isActive: true,
      },
    });
  }

  // Seed industry visits
  const offset = internships.length;
  for (let i = 0; i < industryVisits.length; i++) {
    const visit = industryVisits[i];
    await prisma.corporateConnection.create({
      data: {
        company: visit.company,
        description: "Industry Visit",
        logoUrl: visit.link || null,
        order: offset + i + 1,
        isActive: true,
      },
    });
  }

  console.log("✅ Corporate connections seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
