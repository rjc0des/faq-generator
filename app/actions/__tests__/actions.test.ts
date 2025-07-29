import { getCheckoutURL } from "../actions";

jest.mock("@/lib/lemonsqueezy", () => ({
	configureLemonSqueezy: jest.fn(),
}));

jest.mock("@/lib/supabase/server", () => ({
	createClient: jest.fn(),
}));

jest.mock("@lemonsqueezy/lemonsqueezy.js", () => ({
	createCheckout: jest.fn(),
}));

const mockUser = { id: "user-123", email: "test@example.com" };
const mockCheckoutUrl = "https://checkout.lemon.com/abc";

describe("getCheckoutURL", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("returns checkout URL when user is authenticated", async () => {
		const { createClient } = require("@/lib/supabase/server");
		const { createCheckout } = require("@lemonsqueezy/lemonsqueezy.js");

		createClient.mockResolvedValue({
			auth: {
				getUser: jest.fn().mockResolvedValue({
					data: { user: mockUser },
					error: null,
				}),
			},
		});
		createCheckout.mockResolvedValue({
			data: { data: { attributes: { url: mockCheckoutUrl } } },
		});

		const url = await getCheckoutURL();
		expect(url).toBe(mockCheckoutUrl);
		expect(createCheckout).toHaveBeenCalled();
	});

	it("throws error if user is not authenticated", async () => {
		const { createClient } = require("@/lib/supabase/server");
		createClient.mockResolvedValue({
			auth: {
				getUser: jest.fn().mockResolvedValue({
					data: { user: null },
					error: null,
				}),
			},
		});
		await expect(getCheckoutURL()).rejects.toThrow(
			"User is not authenticated."
		);
	});

	it("throws error if getUser returns error", async () => {
		const { createClient } = require("@/lib/supabase/server");
		createClient.mockResolvedValue({
			auth: {
				getUser: jest.fn().mockResolvedValue({
					data: { user: null },
					error: { message: "Some error" },
				}),
			},
		});
		await expect(getCheckoutURL()).rejects.toThrow(
			"User is not authenticated."
		);
	});
});
