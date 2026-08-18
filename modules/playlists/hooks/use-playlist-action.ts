import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function usePlaylistActions() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  const fetchPlaylists = useCallback(async () => {
    try {
      const response = await fetch("/api/playlist");
      const result = await response.json();

      if (result.success) {
        setPlaylists(result.playlists || []);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const handleCreatePlaylist = async (data: any) => {
    try {
      const response = await fetch("/api/playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsCreateModalOpen(false);
        setPlaylists((prev) => [
          { ...result.playlist, problems: [] },
          ...prev,
        ]);
        toast.success("Playlist created. Use Save on a problem to add it.");
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error(error instanceof Error ? error.message : "Failed to create playlist");
      return false;
    }
  };

  const handleAddToPlaylist = async (problemId: string, playlistId: string) => {
    try {
      const response = await fetch("/api/playlist/add-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, playlistId }),
      });

      const result = await response.json();

      if (result.success) {
        setIsAddToPlaylistModalOpen(false);
        await fetchPlaylists();
        toast.success("Problem added to playlist");
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error adding to playlist:", error);
      toast.error(error instanceof Error ? error.message : "Failed to add problem to playlist");
      return false;
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    try {
      const response = await fetch(`/api/playlist/${playlistId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setPlaylists((prev) =>
          prev.filter((playlist) => playlist.id !== playlistId),
        );
        toast.success("Playlist deleted");
        return true;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error deleting playlist:", error);
      toast.error(error instanceof Error ? error.message : "Failed to delete playlist");
      return false;
    }
  };

  const openAddToPlaylist = (problemId: any) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  return {
    playlists,
    isCreateModalOpen,
    openCreateModal: () => setIsCreateModalOpen(true),
    closeCreateModal: () => setIsCreateModalOpen(false),
    handleCreatePlaylist,

    // Add to playlist modal
    isAddToPlaylistModalOpen,
    selectedProblemId,
    openAddToPlaylist,
    closeAddToPlaylistModal: () => setIsAddToPlaylistModalOpen(false),
    handleAddToPlaylist,
    handleDeletePlaylist,
  };
}
