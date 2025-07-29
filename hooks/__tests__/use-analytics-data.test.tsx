import { renderHook, waitFor } from '@testing-library/react';
import { useAnalyticsData, useAnalyticsStats, FaqGeneration } from '../use-analytics-data';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => mockSupabase),
}));

const mockSupabase: any = {
  rpc: jest.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('useAnalyticsData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns data when supabase.rpc succeeds', async () => {
    const mockData: FaqGeneration[] = [
      { id: '1', title: 'FAQ 1', category: 'cat1', questions_count: 3, created_at: new Date().toISOString(), user_id: 'u1' },
    ];
    mockSupabase.rpc.mockResolvedValue({ data: mockData, error: null });
    const { result } = renderHook(() => useAnalyticsData(), { wrapper });
    await waitFor(() => result.current.isSuccess && expect(result.current.data).toEqual(mockData));
  });

  it('throws and returns empty array on supabase.rpc error', async () => {
    mockSupabase.rpc.mockResolvedValue({ data: null, error: { message: 'fail' } });
    const { result } = renderHook(() => useAnalyticsData(), { wrapper });
    await waitFor(() => result.current.isSuccess && expect(result.current.data).toEqual([]));
  });

  it('returns empty array on exception', async () => {
    mockSupabase.rpc.mockRejectedValue(new Error('exception'));
    const { result } = renderHook(() => useAnalyticsData(), { wrapper });
    await waitFor(() => result.current.isSuccess && expect(result.current.data).toEqual([]));
  });
});

describe('useAnalyticsStats', () => {
  const now = new Date();
  const thisMonth = now.toISOString();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 2).toISOString();
  const faqs: FaqGeneration[] = [
    { id: '1', title: 'FAQ 1', category: 'cat1', questions_count: 3, created_at: thisMonth, user_id: 'u1' },
    { id: '2', title: 'FAQ 2', category: 'cat2', questions_count: 2, created_at: lastMonth, user_id: 'u2' },
    { id: '3', title: 'FAQ 3', category: 'cat1', questions_count: 1, created_at: thisMonth, user_id: 'u1' },
  ];

  it('returns null if data is undefined', () => {
    expect(useAnalyticsStats(undefined)).toBeNull();
  });

  it('calculates stats correctly', () => {
    const stats = useAnalyticsStats(faqs)!;
    expect(stats.totalFAQs).toBe(3);
    expect(stats.categoryData.length).toBeGreaterThan(0);
    expect(stats.dailyGenerations.length).toBe(7);
    expect(stats.recentActivity.length).toBeLessThanOrEqual(4);
    expect(typeof stats.successRate).toBe('number');
    expect(typeof stats.monthlyChange).toBe('number');
  });

  it('handles empty data', () => {
    const stats = useAnalyticsStats([]);
    expect(stats!.totalFAQs).toBe(0);
    expect(stats!.successRate).toBe(0);
    expect(stats!.monthlyChange).toBe(0);
  });
});
