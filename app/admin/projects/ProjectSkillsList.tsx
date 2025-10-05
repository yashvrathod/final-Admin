"use client";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Skill {
  id: string;
  skill: string;
  isActive: boolean;
}

interface ProjectSkillsListProps {
  skills: Skill[];
  toggleSkill: (id: string, isActive: boolean) => void;
  deleteSkill: (id: string) => void;
}

export default function ProjectSkillsList({ skills, toggleSkill, deleteSkill }: ProjectSkillsListProps) {
  return (
    <div className="space-y-4">
      {skills.length === 0 ? (
        <p className="text-sm text-slate-500">No skills yet</p>
      ) : (
        skills.map(skill => (
          <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="font-medium">{skill.skill}</div>
            <div className="flex items-center gap-2">
              <Switch checked={skill.isActive} onCheckedChange={() => toggleSkill(skill.id, skill.isActive)} />
              <Button variant="ghost" size="icon" onClick={() => deleteSkill(skill.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
