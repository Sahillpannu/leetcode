"use client";

import { List, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PlaylistsBar({
  playlists = [],
  onDelete,
}: {
  playlists?: any[];
  onDelete?: (playlistId: string) => void;
}) {
  if (!playlists.length) {
    return null;
  }

  const handleDelete = (playlist: any) => {
    const confirmed = window.confirm(
      `Delete playlist "${playlist.name}"? This cannot be undone.`,
    );

    if (confirmed) {
      onDelete?.(playlist.id);
    }
  };

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-medium">Your Playlists</h3>
          <Badge variant="secondary">{playlists.length}</Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          {playlists.map((playlist) => (
            <Badge
              key={playlist.id}
              variant="outline"
              className="px-3 py-1 text-sm gap-2"
            >
              {playlist.name}
              {typeof playlist.problems?.length === "number" && (
                <span className="text-muted-foreground">
                  {playlist.problems.length}
                </span>
              )}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                className="ml-1 size-5 text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(playlist)}
                aria-label={`Delete ${playlist.name}`}
              >
                <X className="size-3" />
              </Button>
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Click Save on a problem to add it to one of these playlists.
        </p>
      </CardContent>
    </Card>
  );
}
