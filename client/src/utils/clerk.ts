import Clerk from '@clerk/clerk-js';

const clerkFrontendApi = import.meta.env.VITE_NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const clerk = new Clerk(clerkFrontendApi);
// await clerk.load({
// 	// Set load options here...
// });
