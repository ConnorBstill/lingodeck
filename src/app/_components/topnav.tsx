import { SignedOut, SignInButton, UserButton, SignedIn } from "@clerk/nextjs"

export const TopNav = () => {
  return (
    <nav className="flex w-full items-center justify-between p-4 mb-3 text-xl font-semibold border-b">
      <div>Gallery</div>

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  )
}