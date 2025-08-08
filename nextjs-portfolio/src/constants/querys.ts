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

export const ABOUT_QUERY = `*[_type == "about"][0]{
  _id,
  authorName,
  sectionTitle,
  bio,
  "portraitImage": portraitImage{
    asset->{
      _id,
      url
    },
    alt
  },
  "portraitVideo": portraitVideo{
    asset->{
      _id,
      url
    },
    alt
  },
  socialLinks[]{
    platform,
    url,
    icon
  },
  awards[]{
    title,
    year
  },
  skills
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] {
  _id,
  platform,
  url,
  icon
}`;

export const HERO_QUERY = `*[_type == "hero"][0]{
  _id,
  headline,
  title,
  subtitle,
  description,
  "profileImage": profileImage{
    asset->{
      _id,
      url
    },
    alt
  },
  ctaText,
  ctaLink
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
