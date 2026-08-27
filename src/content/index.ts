import { services } from "./services";
import { teamMembers } from "./team";
import { projects } from "./projects";
import { ServiceRecord, ProjectRecord, TeamMemberRecord } from "./types";

export * from "./types";
export { services } from "./services";
export { teamMembers } from "./team";
export { projects } from "./projects";

export function getAllServices(): ServiceRecord[] {
  return services;
}

export function getServiceBySlug(slug: string): ServiceRecord | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllProjects(): ProjectRecord[] {
  return projects;
}

export function getPublishedProjects(): ProjectRecord[] {
  return projects.filter((p) => !p.isDraft);
}

export function getProjectBySlug(slug: string): ProjectRecord | undefined {
  const project = projects.find((p) => p.slug === slug);
  if (!project || project.isDraft) {
    return undefined;
  }
  return project;
}

export function getAllTeamMembers(): TeamMemberRecord[] {
  return teamMembers;
}

export function getTeamMemberByHandle(handle: string): TeamMemberRecord | undefined {
  return teamMembers.find((m) => m.handle === handle);
}