/// -------------------------------------------------------------------------------------- #
/// ** Event Schema**
/// -------------------------------------------------------------------------------------- #
/// -------------------------------------------------------------------------------------- #
export interface eventUserSchema {
  userId: string;
  userName: string;
  joinedDiscord?: boolean;
  gmTotalCount: number;
  gnTotalCount: number;
  gmLastDate: string;
  gnLastDate: string;
  gnStreak: number;
  gmStreak: number;
  gmAllTimeLongestStreak: number;
  gnAllTimeLongestStreak: number;
  wasTimedOut: boolean;
}
