"use client";

import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface Conference {
  id: string;
  title: string;
  authors: string;
  event: string;
  year?: string;
  location?: string;
  doi?: string;
  link?: string;
  isActive: boolean;
}

interface ConferenceListProps {
  conferences: Conference[];
  toggleConference: (id: string, isActive: boolean) => void;
  deleteConference: (id: string) => void;
}

export default function ConferenceList({
  conferences,
  toggleConference,
  deleteConference,
}: ConferenceListProps) {
  return (
    <div className="space-y-4">
      {conferences.length === 0 ? (
        <p className="text-sm text-slate-500">No conference papers yet</p>
      ) : (
        conferences.map((conf) => (
          <div
            key={conf.id}
            className="border-l-4 border-blue-400 bg-blue-50 rounded-xl p-6 shadow-md space-y-2"
          >
            <h3 className="font-semibold text-lg text-blue-900">
              {conf.title}
            </h3>
            <p className="text-sm text-blue-800">{conf.authors}</p>
            <p className="text-sm text-blue-700">
              {conf.event} {conf.year && `(${conf.year})`}
            </p>
            {conf.location && (
              <p className="text-sm text-blue-700">{conf.location}</p>
            )}
            {conf.doi && (
              <p className="text-sm text-blue-700">DOI: {conf.doi}</p>
            )}
            {conf.link && (
              <a
                href={conf.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 hover:underline text-sm font-medium inline-flex items-center"
              >
                Paper Link <FiExternalLink className="ml-1" size={14} />
              </a>
            )}

            <div className="flex items-center gap-2 mt-2">
              <Switch
                checked={conf.isActive}
                onCheckedChange={() => toggleConference(conf.id, conf.isActive)}
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteConference(conf.id)}
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
