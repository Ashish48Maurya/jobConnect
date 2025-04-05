"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import toast from "react-hot-toast"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function page() {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState("job-seeker")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [showPassword, setShowPassword] = useState(false) // 👁️
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handleSignUp = async (event) => {
    event.preventDefault()
    setLoading(true)
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          role,
        }),
      })
      const data = await response.json();
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      if (response.ok) {
        toast.success("User created successfully")
        window.location.href = "/"
      } else {
        toast.error(data.message)
      }
    }
    catch (err) {
      toast.error("An error occurred while creating the user")
    }
    finally {
      setLoading(false)
    }
  }

  return (

    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="mx-auto max-w-md w-full space-y-6 bg-background p-6 md:p-8 rounded-lg border">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground">Enter your information to get started</p>
          </div>
          <div className="space-y-4">
            <RadioGroup defaultValue="job-seeker" className="grid grid-cols-2 gap-4" onValueChange={(val) => setRole(val)}>
              <div>
                <RadioGroupItem value="job-seeker" id="job-seeker" className="peer sr-only" />
                <Label
                  htmlFor="job-seeker"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-2 rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Job Seeker</h3>
                    <p className="text-sm text-muted-foreground">Find your dream job</p>
                  </div>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="employer" id="employer" className="peer sr-only" />
                <Label
                  htmlFor="employer"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <div className="mb-2 rounded-full bg-primary/10 p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                      <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                      <path d="M13 13h4" />
                      <path d="M13 17h4" />
                      <path d="M9 13h.01" />
                      <path d="M9 17h.01" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium">Employer</h3>
                    <p className="text-sm text-muted-foreground">Post jobs & find talent</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john.doe@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSignUp(e)
                    }
                  }}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" onClick={handleSignUp} disabled={loading}>
              {loading ? "Please Wait..." : "Sign Up"}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t">
        <div className="container py-4 px-4 md:px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} JobConnect. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

