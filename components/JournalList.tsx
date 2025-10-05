"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Journal {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year?: string;
  type: string;
  doi?: string;
  link?: string;
  isActive: boolean;
}

interface JournalListProps {
  journals: Journal[];
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export default function JournalList({
  journals,
  onToggle,
  onDelete,
}: JournalListProps) {
  const [list, setList] = useState(journals);

  return (
    <div className="space-y-4">
      {list.map((journal) => (
        <div
          key={journal.id}
          className="flex items-start justify-between p-4 border rounded-lg"
        >
          <div className="flex-1">
            <div className="font-medium">{journal.title}</div>
            <div className="text-sm text-slate-500">{journal.authors}</div>
            <div className="text-sm text-slate-500">
              {journal.journal} {journal.year && `(${journal.year})`} •{" "}
              {journal.type}
            </div>
            {journal.doi && (
              <div className="text-sm text-primary">DOI: {journal.doi}</div>
            )}
            {journal.link && (
              <div className="text-sm text-blue-600 underline">
                <a href={journal.link} target="_blank">
                  {journal.link}
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={journal.isActive}
              onCheckedChange={() => {
                onToggle(journal.id, journal.isActive);
                journal.isActive = !journal.isActive;
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                onDelete(journal.id);
                setList(list.filter((j) => j.id !== journal.id));
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
