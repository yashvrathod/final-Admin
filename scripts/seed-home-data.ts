import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding home page data...")

  // Seed Timeline Items
  console.log("📅 Seeding timeline items...")
  await prisma.timelineItem.createMany({
    data: [
      {
        year: "2024",
        title: "Ph.D. in Electronics and Communication Engineering",
        description: "Sri Satya Sai University of Technology & Medical Sciences, Sehore",
        order: 1,
        isActive: true,
      },
      {
        year: "2024",
        title: "Assistant Professor at VIIT Pune",
        description: "Guiding students and leading innovative research.",
        order: 2,
        isActive: true,
      },
      {
        year: "2024",
        title: "50+ Publications & 20+ Years Experience",
        description: "Specializing in Computer Network Security, WSN, IoT, AI, and advanced computing.",
        order: 3,
        isActive: true,
      },
    ],
  })

  // Seed Stats
  console.log("📊 Seeding stats...")
  await prisma.stat.createMany({
    data: [
      { label: "Publications", value: "50", order: 1, isActive: true },
      { label: "Years Experience", value: "20", order: 2, isActive: true },
      { label: "Students Mentored", value: "200", order: 3, isActive: true },
      { label: "Projects Guided", value: "50", order: 4, isActive: true },
    ],
  })

  // Seed Internships
  console.log("💼 Seeding internships...")
  await prisma.internship.createMany({
    data: [
      {
        company: "Healthy Globe Smart Virtual Education Pvt. Ltd. (Padhega Bharat)",
        details: "05 Students (FYBTECH Students), Signed MOU",
        link: "https://www.linkedin.com/company/padhegabharat/?originalSubdomain=in",
        order: 1,
      },
      {
        company: "Deep Learning Research & Development (DLRD)",
        details: "11 Students (FYBTECH/SYBTECH Students)",
        link: "",
        order: 2,
      },
      {
        company: "PrepBytes, Ghaziabad",
        details: "Conducted Online workshop on Competitive Coding for FYBTECH Students",
        link: "https://www.prepbytes.com/",
        order: 3,
      },
      {
        company: "PROGO",
        details: "01 Student (SYBTECH Student)",
        link: "",
        order: 4,
      },
      {
        company: "Optimum Data Analytics (ODA), Pune",
        details: "Signed MOU, 20 Students (SYBTECH Students), Completed 4 Industrial Projects",
        link: "https://optimumdataanalytics.com/",
        order: 5,
      },
      {
        company: "ASIC Networking Services Pvt. Ltd., Pune",
        details: "Signed MOU",
        link: "https://www.linkedin.com/company/asic-networking-services-pte-ltd/?originalSubdomain=in",
        order: 6,
      },
      {
        company: "RIMOTE Private Limited, Singapore",
        details: "06 Students (Final Year), 02 Students (Third Year), Signed MOU",
        link: "",
        order: 7,
      },
      {
        company: "Code Gurukul, Pune",
        details: "40+ Students (Final Year/SYBTECH/TYBTECH)",
        link: "https://www.linkedin.com/company/code-gurukul/",
        order: 8,
      },
      {
        company: "OXVSYS, Pune",
        details: "02 Students",
        link: "https://oxvsys.com/",
        order: 9,
      },
      {
        company: "INNOTEK IT SYSTEMS LLP",
        details: "40 Students (FYBTECH Students)",
        link: "https://innoteksystem.com/",
        order: 10,
      },
      {
        company: "CREATOR RESEARCH Pvt. Ltd.",
        details: "04 Students (FYBTECH Students)",
        link: "https://creatorresearch.com/",
        order: 11,
      },
      {
        company: "Intenics Private Limited, Jabalpur",
        details: "03 Students (FYBTECH Students), Product Development under Internship – 01 Student",
        link: "https://intenics.in/",
        order: 12,
      },
    ],
  })

  // Seed Industry Visits
  console.log("🏭 Seeding industry visits...")
  await prisma.industryVisit.createMany({
    data: [
      { name: "Mag Power, Pune", link: "https://magpowerpune.com/", order: 1 },
      { name: "Revogreen Technologies Pvt. Ltd., Pune", link: "https://revogreen.in/", order: 2 },
      { name: "Halliburton, Pune", link: "https://www.halliburton.com/", order: 3 },
      { name: "H. B. Fuller", link: "https://www.hbfuller.com/", order: 4 },
      { name: "Intenics Private Limited, Jabalpur", link: "https://intenics.in/", order: 5 },
    ],
  })

  // Seed Research Interests
  console.log("🔬 Seeding research interests...")
  await prisma.researchInterest.createMany({
    data: [
      { interest: "Intrusion Detection and Prevention Systems (IDS/IPS) using tools such as Snort", order: 1 },
      {
        interest:
          "Detection and mitigation of Denial of Service (DoS) attacks (ICMP, UDP, TCP SYN, IP Spoofing, ARP Poisoning)",
        order: 2,
      },
      { interest: "Offline and Online Solutions for Network Attack Prevention", order: 3 },
      { interest: "Data Mining Techniques (using Weka) for Network and Cloud Security", order: 4 },
      { interest: "Routing Protocols and Router Configuration for Secure Communication", order: 5 },
      { interest: "Design and Development of Hardware Firewalls for Comprehensive Network Protection", order: 6 },
      { interest: "IoT-based Smart City Applications with Cloud Computing Integration", order: 7 },
      {
        interest:
          "Application of Artificial Intelligence, Machine Learning, and Deep Learning (Python-based) for Network Security and IoT Solutions",
        order: 8,
      },
    ],
  })

  // Seed Teaching Interests
  console.log("📚 Seeding teaching interests...")
  await prisma.teachingInterest.createMany({
    data: [
      { interest: "Computer Networks", order: 1 },
      { interest: "Telecommunication Switching and Systems", order: 2 },
      { interest: "Management Information System", order: 3 },
      { interest: "Computer Networks and Security", order: 4 },
      { interest: "Mobile Communication", order: 5 },
      { interest: "Computer Fundamentals/Programming (C, C++, Embedded C)", order: 6 },
      { interest: "Data Structure and Algorithm", order: 7 },
    ],
  })

  // Seed Area of Interests
  console.log("🎯 Seeding area of interests...")
  await prisma.areaOfInterest.createMany({
    data: [
      { interest: "Computer Networks and Security", order: 1 },
      { interest: "Data Communication and Networking", order: 2 },
      { interest: "Programming Languages (C, C++, Python)", order: 3 },
      { interest: "Internet of Things (IoT) and Smart City Applications", order: 4 },
      { interest: "Cloud Computing", order: 5 },
      { interest: "Educational Technology and Interactive Online Learning Platforms", order: 6 },
    ],
  })

  // Seed Professional Info
  console.log("👔 Seeding professional info...")
  await prisma.professionalInfo.createMany({
    data: [
      {
        title: "Current Position",
        text: "Assistant Professor, Department of Electronics & Telecommunication Engineering",
        icon: "FiBriefcase",
        order: 1,
      },
      {
        title: "Education",
        text: "Ph.D. in Electronics & Communication Engineering",
        icon: "FiBookOpen",
        order: 2,
      },
      {
        title: "Experience",
        text: "20+ years teaching experience\n1+ year industry experience",
        icon: "FiClock",
        order: 3,
      },
      {
        title: "Research Focus",
        text: "FLOW-BASED PATTERN MATCHING APPROACH TO MITIGATE THE DENIAL OF SERVICE ATTACK ON COMMUNICATION NETWORK",
        icon: "FiTarget",
        order: 4,
      },
    ],
  })

  // Seed Skill Sections
  console.log("💻 Seeding skill sections...")
  await prisma.skillSection.createMany({
    data: [
      {
        title: "Network Skills",
        icon: "FiWifi",
        color: "bg-yellow-50 border-yellow-200",
        items: [
          "LAN Configuration",
          "Switch and Router Configuration",
          "Network Programming",
          "Internet Traffic Monitoring (Tcpdump, Wireshark)",
        ],
        order: 1,
      },
      {
        title: "Tools & Technologies",
        icon: "FiTool",
        color: "bg-amber-50 border-amber-200",
        items: [
          "Snort (Intrusion Detection System)",
          "Weka (Data Mining)",
          "hping3 (Network Testing)",
          "Network Monitoring Tools",
        ],
        order: 2,
      },
      {
        title: "Programming Languages",
        icon: "FiCode",
        color: "bg-yellow-50 border-yellow-200",
        items: ["C, C++", "Java", "Python", "Embedded C"],
        order: 3,
      },
      {
        title: "Other Technical Skills",
        icon: "FiCpu",
        color: "bg-amber-50 border-amber-200",
        items: ["Website Development", "IoT System Design", "Machine Learning Implementation"],
        order: 4,
      },
    ],
  })

  // Seed Courses Taught
  console.log("📖 Seeding courses taught...")
  await prisma.courseTaught.createMany({
    data: [
      { course: "Computer Networks and Security", order: 1 },
      { course: "Telecommunication Switching and Systems", order: 2 },
      { course: "Management Information System", order: 3 },
      { course: "Object Oriented Programming", order: 4 },
      { course: "Operating System", order: 5 },
      { course: "Mobile Communication", order: 6 },
      { course: "Computer Fundamentals/Programming (C, C++, Embedded C)", order: 7 },
      { course: "Data Structure and Algorithm", order: 8 },
    ],
  })

  // Seed Project Guidance
  console.log("🎓 Seeding project guidance...")
  await prisma.projectGuidance.createMany({
    data: [
      { guidance: "BE/BTech Final Year Projects: 30+", order: 1 },
      { guidance: "BE/BTech Third Year Projects: 20+", order: 2 },
      { guidance: "BE/BTech Second Year Projects: 20+", order: 3 },
      { guidance: "FY BTech Project-Based Learning: 700+", order: 4 },
    ],
  })

  // Seed Certifications
  console.log("🏆 Seeding certifications...")
  await prisma.certification.createMany({
    data: [
      {
        title: "Advanced Diploma in Computer Hardware and Networking (ADCHN)",
        issuer: "Jetking",
        issueDate: "2001",
        description: "Jetking, Noida | First Class (66.00%)",
        credentialUrl: "https://www.linkedin.com/school/jetkingnoida/",
        order: 1,
      },
      {
        title: "Cisco Certified Network Associate (CCNA)",
        issuer: "Cisco",
        issueDate: "2007",
        description: "Score: 100%",
        credentialUrl: "https://www.linkedin.com/company/cisco/",
        order: 2,
      },
      {
        title: "ICSI | CNSS Certified Network Security Specialist",
        issuer: "DefensityOne",
        issueDate: "2020",
        credentialUrl: "https://www.linkedin.com/company/defensityone-uk/",
        order: 3,
      },
      {
        title: "Programming for Everybody (Getting Started with Python)",
        issuer: "Coursera",
        issueDate: "2020",
        credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/KXR9P4WEUAVL",
        order: 4,
      },
      {
        title: "Python 3 Network Programming",
        issuer: "Udemy",
        issueDate: "2020",
        credentialUrl: "https://www.udemy.com/",
        order: 5,
      },
    ],
  })

  // Seed Talks
  console.log("🎤 Seeding talks...")
  await prisma.talk.createMany({
    data: [
      {
        title: "Computer Network",
        event: "Bharti Vidyapeeth Women's College of Engineering, Pune",
        location: "Pune",
        slidesUrl: "https://coewpune.bharatividyapeeth.edu/",
        order: 1,
      },
      {
        title: "Computer Network and Architecture",
        event: "Trinity College of Engineering and Research, Pune",
        location: "Pune",
        slidesUrl: "https://www.kjei.edu.in/tcoer/",
        order: 2,
      },
    ],
  })

  // Seed Testimonials
  console.log("💬 Seeding testimonials...")
  await prisma.testimonial.createMany({
    data: [
      // Industry testimonials
      {
        name: "Avinash Sawant",
        role: "Engineering Director",
        company: "Seagate Technology",
        content:
          "I have had the pleasure of working with Anup Ingle, Assistant Professor, and his team in building strong industry-academia collaboration. Through his efforts, we have been able to onboard highly skilled interns at Seagate Technology, which has greatly supported our projects.\n\nAnup consistently provides valuable guidance on bridging the gap between college and industry, ensuring students are well-prepared for real-world challenges. His passion for innovation is evident in the way he and his team work on cutting-edge technologies such as Artificial Intelligence, Machine Learning, and Cybersecurity.\n\nOur experience working with Anup has been excellent, and I truly appreciate his dedication, forward-looking mindset, and commitment to nurturing the next generation of talent.",
        category: "industry",
        order: 1,
      },
      {
        name: "Dr Mayur Desai",
        role: "Director",
        company: "Creator Research Pvt Ltd",
        content: "Dr Anup sir is very friendly, dedicated to his work. Supported and motivated person.",
        category: "industry",
        order: 2,
      },
      {
        name: "Milind Kulkarni",
        role: "HRBP India Lead",
        company: "H B Fuller India",
        content:
          "Dr. Anup demonstrates a strong understanding of organizational requirements and provides collaborative support. His expertise and knowledge are highly valued, and he proactively fosters strong working relationships.",
        category: "industry",
        order: 3,
      },
      {
        name: "Sujeet Brahmankar",
        role: "Software Developer",
        company: "Edtech",
        content:
          "I had the privilege of working with Dr. Anup Ingle between 2018–2020, during which he mentored us on an edtech project. His strategic guidance, insightful analysis of students' needs, and ability to provide practical solutions were invaluable in shaping the project's direction and success. I highly recommend Dr. Ingle for his expertise and impactful mentorship.",
        category: "industry",
        order: 4,
      },
      {
        name: "Anurag Shrikhande",
        role: "Managing Director",
        company: "SDPL And Intenics Pvt Ltd",
        content:
          "It was a pleasure to work with Dr. Anup Ingle for our product designing project Smart Water Info. Initially, it was complicated up to the first phase of the technical stage, but his support and knowledge were highly applicable. I wish him a bright future.",
        category: "industry",
        order: 5,
      },
      {
        name: "Amresh Khar",
        role: "Self Employed",
        company: "Automobiles",
        content:
          "Mr. Anup is one of the dedicated members in the industry of academia who takes major decisions to accomplish dreams of his students. A person who takes initiative to bridge industry with academic students. In one word — 'Humble'.",
        category: "industry",
        order: 6,
      },
      {
        name: "Dr Purabi Garai",
        role: "Scientist",
        company: "DRDO",
        content:
          "Dr Anup is a specialist in the field of Electronics & Communication and is a learned academician. He has been working on various significant projects and nurtures his students to stand in world-level competition. Best wishes.",
        category: "industry",
        order: 7,
      },
      // Student testimonials
      {
        name: "Yash Rathod",
        role: "Student",
        company: "E&TC 2026, Vishwakarma Institute of Information Technology",
        content:
          "Learning under Anup Sir has been inspiring — his practical insights and constant encouragement push me to think bigger and do better.",
        category: "students",
        order: 1,
      },
      {
        name: "Dr. Rameez Shamalik",
        role: "Associate Professor",
        company: "MIT ADTU, E&TC 2008",
        content:
          "Anup sir being so young and friendly was the breath of fresh air and a 'Go to' person for all of us. His smile and problem-solving attitude made our final year easy and worth remembering.",
        category: "students",
        order: 2,
      },
      {
        name: "Rujuta Mhaskar",
        role: "Freelance Consultant",
        company: "BE E&TC 2015",
        content:
          "We had the privilege of learning under professors like Anup Sir, whose unwavering commitment to teaching consistently stood above all else. His dedication to his students and their academic growth was truly exceptional.",
        category: "students",
        order: 3,
      },
      {
        name: "Purva Sanjay Gaikwad",
        role: "SDE",
        company: "Amazon Web Services, BTech Computer Engineering 2022",
        content:
          "I'm truly grateful to Dr. Anup Ingle from the Computer Science department for his constant guidance and mentorship. His support was instrumental in helping me secure my internship, and his advice has had a lasting impact on my academic and professional growth.",
        category: "students",
        order: 4,
      },
      {
        name: "Abhishek Mallav",
        role: "Student",
        company: "ENTC 2027, Vishwakarma Institute of Information Technology",
        content:
          "Your teaching in networking was truly exceptional. The way you explained the OSI model, the functions of different network layers, and networking concepts in general was both insightful and engaging. Your guidance not only helped me build a strong understanding of how networks operate but also gave me a clearer perspective on how communication happens between devices over the internet. It was an invaluable learning experience.",
        category: "students",
        order: 5,
      },
      {
        name: "Piyush Bali",
        role: "Senior Software Engineer",
        company: "eQTechnologic Pvt Ltd, CSE 2022",
        content:
          "Dr. Anup Ingle was the first to spark my interest in programming. His guidance, encouragement for research, and the platform he created for competitive programming shaped both my skills and confidence. Under his guidance, I was able to create an environment for competitive programming in college.",
        category: "students",
        order: 6,
      },
      {
        name: "Vaishnav Gonare",
        role: "Cloud Engineer",
        company: "Glide Clouds, B.Tech E&TC 2025",
        content:
          "Learning under Dr. Anup Ingle Sir was a truly enriching experience. His teaching style, mentorship, and constant encouragement inspired me to grow both technically and personally.",
        category: "students",
        order: 7,
      },
      {
        name: "Vedant Bhosale",
        role: "IT Admin",
        company: "Trade and Retail, BTech IT 2022",
        content:
          "Dr. Anup Ingle's teaching and hands-on lab sessions really strengthened my programming skills. His mentorship made tough concepts easy to understand and gave me the confidence to tackle real-world challenges in the industry.",
        category: "students",
        order: 8,
      },
    ],
  })

  console.log("✅ Home page data seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding data:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
