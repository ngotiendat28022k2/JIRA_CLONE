export interface IIssue {
  id?: string;
  type: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  index?: string;
  timeSpent?: number;
  timeRemaining?: number;
  estimate?: number;
  commentId?: [];
  projectId: string;
  assignees?: [];
  userId: string;
  members?: [];
  createdAt?: number;
  startDate: string;
  dueDate: string;
}
