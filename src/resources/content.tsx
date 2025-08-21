import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Logo } from "@once-ui-system/core";

const person: Person = {
  firstName: "Faizaan",
  lastName: "Khan",
  name: `Faizaan Fazal Khan`,
  role: "Software Developer",
  avatar: "/images/avatar.jpg",
  email: "dkfaizaan12@gmail.com",
  location: "Asia/Seoul",
  languages: ["English", "Urdu"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.name}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/FaizaanFazal",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/faizaan-fazal-a02246242/",
  },
  {
    name: "Threads",
    icon: "threads",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Building bridges between design and code</>,
  featured: {
    display: true,
    title: (
      <>
        Recent project: <strong className="ml-4">Naudebourn</strong>
      </>
    ),
    href: "/work/naudebourn",
  },
  subline: (
    <>
      I'm Faizaan, a software developer at{" "}
      <Logo
        icon="/trademarks/wordmark-dark.svg"
        style={{ display: "inline-flex", top: "0.25em", marginLeft: "-0.25em" }}
      />
      , where I craft intuitive
      <br /> user experiences. After hours, I build my own projects.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – Faizaan Fazal`,
  description: `Meet Faizaan Fazal, Full Stack Web Developer from South Korea (originally Pakistan)`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com", // replace with your actual Cal.com link if you use one
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>Faizaan is a remote-based Full Stack Web Developer with experience in building scalable,
        user-friendly web applications. He specializes in React.js, Next.js, Node.js, and MongoDB/PostgreSQL,
        and has worked on e-commerce, SaaS, and service websites. With a research background in 3D medical imaging,
        he combines technical depth with practical product delivery.</>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Jazba Innovations",
        timeframe: "2023 – Present",
        role: "Software Team Lead (Remote)",
        achievements: [
          <>Built a full-stack internal management system using Next.js, Node.js, and MongoDB/PostgreSQL.</>,
          <>Implemented SEO and analytics integrations (Google Tag Manager, metadata, sitemaps).</>,
          <>Delivered scalable pipelines for automated data scraping with 5–10× faster ingestion.</>,
        ],
        images: [],
      },
      {
        company: "NCLS&C, NUST",
        timeframe: "2023 – 2024",
        role: "Lecturer",
        achievements: [
          <>Delivered lectures on computer science fundamentals and software engineering concepts.</>,
          <>Mentored students in coding best practices and modern web technologies.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "Chosun University, South Korea",
        description: <>M.S. in Information & Communication Engineering (Research in 3D Medical Imaging), Expected Dec 2025</>,
      },
      {
        name: "Air University Islamabad, Pakistan",
        description: <>B.S. in Computer Science, Graduated 2023</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: (
          <>Advanced in React.js, Next.js, TypeScript, Tailwind CSS, and Material UI. Experienced with responsive design and accessibility.</>
        ),
        images: [],
      },
      {
        title: "Backend & Databases",
        description: (
          <>Skilled in Node.js, Express.js, Prisma, MongoDB, PostgreSQL. Experience with REST APIs, GraphQL, and WebSockets.</>
        ),
        images: [],
      },
      {
        title: "E-Commerce Platforms",
        description: (
          <>Integrated Shopify APIs with secure authentication, payment flows, and SEO optimization.</>
        ),
        images: [],
      },
      {
        title: "Testing & Deployment",
        description: (
          <>Proficient in Jest, React Testing Library, GitHub CI/CD, Docker, and deployment via Vercel/Netlify.</>
        ),
        images: [],
      },
    ],
  },
};


const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about web development and AI...",
  description: `Read what ${person.name} has been learning and building in full stack development, AI, and product engineering.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Full stack web apps, e-commerce sites, and AI projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/projects/naudebourn/blogH.PNG",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/naudebourn/homepageH.png",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/naudebourn/homepage.png",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/projects/Quora/dashboard.PNG",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/rv/homepage.PNG",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/Quora/extension.PNG",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/waltier/homepageH.PNG",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/projects/okanagan/homepage.png",
      alt: "image",
      orientation: "vertical",
    }
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
