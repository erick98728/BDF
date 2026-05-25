export type FeedbackRatings = 1 | 2 | 3 | 4 | 5;

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
