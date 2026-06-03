export type FeedbackRatings = 1 | 2 | 3 | 4 | 5;

export type FeedbackStatus = "new" | "reviewing" | "resolved" | "ignored";

export type FeedbackFormData = {
  nickname: string;
  email: string;
  playtime: string;
  progressPoint: string;
  movementRating: FeedbackRatings;
  combatRating: FeedbackRatings;
  mapRating: FeedbackRatings;
  difficultyRating: FeedbackRatings;
  foundBug: boolean;
  bugDescription: string;
  suggestions: string;
};

export type AdminFeedbackItem = {
  id: string;
  created_at: string;
  user_id: string | null;
  beta_version: string | null;
  nickname: string;
  email: string;
  playtime: string;
  progress_point: string;
  movement_rating: number;
  combat_rating: number;
  map_rating: number;
  difficulty_rating: number;
  found_bug: boolean;
  bug_description: string | null;
  suggestions: string | null;
  status: FeedbackStatus;
  admin_notes: string | null;
  reviewed_by: string | null;
  reviewed_at: string | null;
};
