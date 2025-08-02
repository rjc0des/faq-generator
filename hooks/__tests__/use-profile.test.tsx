import { renderHook, waitFor } from "@testing-library/react";
import { useProfile } from "../use-profile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("@/lib/supabase/client", () => ({
	createClient: jest.fn(() => mockSupabase),
}));

const mockSupabase: any = {
	auth: {
		getUser: jest.fn(),
	},
	from: jest.fn(() => mockSupabase),
	select: jest.fn(() => mockSupabase),
	eq: jest.fn(() => mockSupabase),
	single: jest.fn(),
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={new QueryClient()}>
		{children}
	</QueryClientProvider>
);

describe("useProfile", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns profile data when both auth and profile queries succeed", async () => {
		const mockUser = { id: "user-123", email: "test@example.com" };
		const mockProfile = {
			id: "user-123",
			name: "Test User",
			email: "test@example.com",
			created_at: "2023-01-01",
		};

		mockSupabase.auth.getUser.mockResolvedValue({
			data: { user: mockUser },
			error: null,
		});
		mockSupabase.single.mockResolvedValue({
			data: mockProfile,
			error: null,
		});

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(
			() =>
				result.current.isSuccess &&
				expect(result.current.data).toEqual(mockProfile)
		);
	});

	it("returns empty object when auth.getUser throws error", async () => {
		mockSupabase.auth.getUser.mockResolvedValue({
			data: { user: null },
			error: { message: "User not found" },
		});

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(
			() =>
				result.current.isSuccess &&
				expect(result.current.data).toEqual({})
		);
	});

	it("returns empty object when profile data is not found", async () => {
		const mockUser = { id: "user-123", email: "test@example.com" };

		mockSupabase.auth.getUser.mockResolvedValue({
			data: { user: mockUser },
			error: null,
		});
		mockSupabase.single.mockResolvedValue({ data: null, error: null });

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(
			() =>
				result.current.isSuccess &&
				expect(result.current.data).toEqual({})
		);
	});

	it("returns empty object when auth.getUser throws exception", async () => {
		mockSupabase.auth.getUser.mockRejectedValue(new Error("Network error"));

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(
			() =>
				result.current.isSuccess &&
				expect(result.current.data).toEqual({})
		);
	});

	it("returns empty object when profile query throws exception", async () => {
		const mockUser = { id: "user-123", email: "test@example.com" };

		mockSupabase.auth.getUser.mockResolvedValue({
			data: { user: mockUser },
			error: null,
		});
		mockSupabase.single.mockRejectedValue(new Error("Database error"));

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(
			() =>
				result.current.isSuccess &&
				expect(result.current.data).toEqual({})
		);
	});

	it("handles user with null id", async () => {
		const mockUser = { id: null, email: "test@example.com" };

		mockSupabase.auth.getUser.mockResolvedValue({
			data: { user: mockUser },
			error: null,
		});
		mockSupabase.single.mockResolvedValue({ data: null, error: null });

		const { result } = renderHook(() => useProfile(), { wrapper });

		await waitFor(
			() =>
				result.current.isSuccess &&
				expect(result.current.data).toEqual({})
		);
	});
});
