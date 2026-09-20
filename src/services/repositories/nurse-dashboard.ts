import { DashboardSummary } from '../../types/dashboard';
import { NurseAssignment, NurseWorklistItem, NurseWorklistFilter, matchesWorklistFilter } from '../../types/dashboard';
import { NurseMonitoringRule } from '../../types/dashboard';

export interface NurseDashboardRepository {
  getDashboardSummary(): Promise<DashboardSummary>;
  getPriorityQueue(): Promise<NurseAssignment[]>;
  getRecentSubmissions(limit?: number): Promise<NurseWorklistItem[]>;
  getMonitoringRules(): Promise<NurseMonitoringRule[]>;
}
