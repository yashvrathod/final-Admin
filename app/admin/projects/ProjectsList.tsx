"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  shortDescription?: string;
  technologies?: string;
  isActive: boolean;
}

interface ProjectsListProps {
  projects: Project[];
  toggleProject: (id: string, isActive: boolean) => void;
  deleteProject: (id: string) => void;
}

export default function ProjectsList({
  projects,
  toggleProject,
  deleteProject,
}: ProjectsListProps) {
  return (
    <div className="space-y-4">
      {projects.length === 0 ? (
        <p className="text-sm text-slate-500">No projects yet</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="flex items-start justify-between p-4 border rounded-lg"
          >
            <div className="flex-1">
              <div className="font-medium">{project.title}</div>
              {project.shortDescription && (
                <p className="text-sm text-slate-500 mt-1">
                  {project.shortDescription}
                </p>
              )}
              {project.technologies && (
                <p className="text-sm text-slate-500 mt-1">
                  Tech: {project.technologies}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={project.isActive}
                onCheckedChange={() =>
                  toggleProject(project.id, project.isActive)
                }
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteProject(project.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
