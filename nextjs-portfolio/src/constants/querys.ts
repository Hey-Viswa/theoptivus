export const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  image {
    asset-> {
      url
    }
  },
  techStack,
  githubUrl,
  liveUrl
}`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(startDate desc) {
  _id,
  company,
  role,
  startDate,
  endDate,
  description,
  companyLogo {
    asset-> {
      url
    }
  }
}`;

export const TECH_STACK_QUERY = `*[_type == "tech"] | order(name asc) {
  _id,
  name,
  logo {
    asset-> {
      url
    }
  },
  category
}`;

export const ABOUT_QUERY = `*[_type == "about"][0] {
  _id,
  bio,
  image {
    asset-> {
      url
    }
  },
  skills
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] {
  _id,
  platform,
  url,
  icon
}`;

export const HERO_QUERY = `*[_type == "heroSection"][0] {
  _id,
  headline,
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  profileImage {
    asset-> {
      url
    }
  }
}`;

export const CONTACT_QUERY = `*[_type == "contact"][0] {
  _id,
  email,
  phone,
  linkedIn,
  github,
  twitter,
  resume {
    asset-> {
      url
    }
  }
}`;
