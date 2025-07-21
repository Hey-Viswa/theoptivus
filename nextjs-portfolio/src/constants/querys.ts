export const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  description,
  image,
  techStack,
  githubUrl,
  liveUrl
}`;

export const EXPERIENCES_QUERY = `*[_type == "experience"] | order(startDate desc) {
  _id,
  company,
  position,
  startDate,
  endDate,
  isCurrent,
  description,
  technologies
}`;

export const SKILLS_QUERY = `*[_type == "skill"] | order(name asc) {
  _id,
  name,
  icon,
  proficiency
}`;

export const ABOUT_QUERY = `*[_type == "about"][0] {
  _id,
  name,
  role,
  description,
  profileImage
}`;

export const SOCIAL_LINKS_QUERY = `*[_type == "socialLink"] {
  _id,
  platform,
  url,
  icon
}`;

export const HERO_QUERY = `*[_type == "hero"][0] {
  _id,
  heading,
  subheading,
  tagline,
  profileImage {
    asset->{
      url,
      metadata
    }
  },
  ctaText,
  ctaLink
}`;

